
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, TrashIcon } from '@/components/icons/Icons';

interface FlowNode {
  id: string;
  type: 'message' | 'input' | 'condition' | 'api' | 'llm';
  data: {
    content?: string;
    variable?: string;
    condition?: string;
    endpoint?: string;
    model?: string;
    prompt?: string;
  };
  position: { x: number; y: number };
}

const FlowCanvas = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with a starter node
    if (nodes.length === 0) {
      addNode('message', 100, 100);
    }
  }, []);

  const addNode = (type: FlowNode['type'], x: number, y: number) => {
    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type,
      data: {},
      position: { x, y },
    };
    
    setNodes(prev => [...prev, newNode]);
  };

  const updateNodeData = (id: string, data: Partial<FlowNode['data']>) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === id 
          ? { ...node, data: { ...node.data, ...data } } 
          : node
      )
    );
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (e.target instanceof HTMLElement && e.target.closest('.node-content')) {
      // If clicking inside content area, don't start dragging
      return;
    }
    
    setIsDragging(true);
    setDraggedNodeId(nodeId);
    
    const node = nodes.find(n => n.id === nodeId);
    if (node && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({ 
        x: e.clientX - (rect.left + node.position.x),
        y: e.clientY - (rect.top + node.position.y)
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNodeId || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;
    
    setNodes(prev => 
      prev.map(node => 
        node.id === draggedNodeId
          ? { ...node, position: { x, y } }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
  };

  const handleAddNode = (type: FlowNode['type']) => {
    // Add new node below the last one
    const lastNode = nodes[nodes.length - 1];
    const yPos = lastNode ? lastNode.position.y + 200 : 100;
    addNode(type, 100, yPos);
  };

  const deleteNode = (id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
  };

  const renderNodeContent = (node: FlowNode) => {
    switch (node.type) {
      case 'message':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea 
              value={node.data.content || ''} 
              onChange={(e) => updateNodeData(node.id, { content: e.target.value })}
              placeholder="Message to send to the user" 
              className="min-h-[80px]"
            />
          </div>
        );
        
      case 'input':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Variable</label>
            <Input 
              value={node.data.variable || ''} 
              onChange={(e) => updateNodeData(node.id, { variable: e.target.value })}
              placeholder="Variable name" 
            />
            <Input 
              value={node.data.content || ''} 
              onChange={(e) => updateNodeData(node.id, { content: e.target.value })}
              placeholder="Prompt for input" 
            />
          </div>
        );
        
      case 'condition':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Condition</label>
            <Textarea 
              value={node.data.condition || ''} 
              onChange={(e) => updateNodeData(node.id, { condition: e.target.value })}
              placeholder="if variable == 'value'" 
              className="h-16"
            />
          </div>
        );
        
      case 'api':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">API Endpoint</label>
            <Input 
              value={node.data.endpoint || ''} 
              onChange={(e) => updateNodeData(node.id, { endpoint: e.target.value })}
              placeholder="https://api.example.com/endpoint" 
            />
          </div>
        );
        
      case 'llm':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">LLM Model</label>
            <Select 
              value={node.data.model || 'gpt-3.5-turbo'} 
              onValueChange={(value) => updateNodeData(node.id, { model: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="mistral-large">Mistral Large</SelectItem>
              </SelectContent>
            </Select>
            
            <label className="text-sm font-medium mt-2">Prompt</label>
            <Textarea 
              value={node.data.prompt || ''} 
              onChange={(e) => updateNodeData(node.id, { prompt: e.target.value })}
              placeholder="Enter your prompt here..." 
              className="min-h-[100px]"
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <Button size="sm" variant="outline" onClick={() => handleAddNode('message')}>
          <PlusIcon className="w-4 h-4 mr-1" /> Message
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddNode('input')}>
          <PlusIcon className="w-4 h-4 mr-1" /> Input
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddNode('condition')}>
          <PlusIcon className="w-4 h-4 mr-1" /> Condition
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddNode('api')}>
          <PlusIcon className="w-4 h-4 mr-1" /> API Call
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddNode('llm')}>
          <PlusIcon className="w-4 h-4 mr-1" /> LLM
        </Button>
      </div>
      
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-background border border-border rounded-lg overflow-auto"
        style={{ minHeight: '500px' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className="flow-node absolute"
            style={{
              left: `${node.position.x}px`,
              top: `${node.position.y}px`,
              width: '280px',
              cursor: isDragging && draggedNodeId === node.id ? 'grabbing' : 'grab',
            }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  node.type === 'message' ? 'bg-primary' :
                  node.type === 'input' ? 'bg-secondary' :
                  node.type === 'condition' ? 'bg-yellow-500' :
                  node.type === 'api' ? 'bg-blue-500' :
                  'bg-green-500'
                }`}></div>
                <span className="text-sm font-semibold capitalize">{node.type}</span>
              </div>
              <Button
                variant="ghost" 
                size="icon"
                onClick={() => deleteNode(node.id)}
                className="h-6 w-6"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="node-content">
              {renderNodeContent(node)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowCanvas;
