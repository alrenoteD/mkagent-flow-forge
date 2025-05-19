
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusIcon, TrashIcon } from '@/components/icons/Icons';
import SaveIcon from '@/components/icons/SaveIcon';
import { useToast } from '@/hooks/use-toast';

interface FlowNode {
  id: string;
  type: 'message' | 'input' | 'condition' | 'api' | 'llm' | 'webhook' | 'delay';
  data: {
    content?: string;
    variable?: string;
    condition?: string;
    endpoint?: string;
    model?: string;
    prompt?: string;
    delay?: number;
    webhookUrl?: string;
    method?: string;
    headers?: string;
    body?: string;
  };
  position: { x: number; y: number };
  connections: string[]; // IDs of connected nodes
}

const FlowCanvas = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [flowName, setFlowName] = useState("My Agent Flow");
  const [connectionMode, setConnectionMode] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with a starter node
    if (nodes.length === 0) {
      addNode('message', 100, 100);
    }

    // Load flow from localStorage if available
    const savedFlow = localStorage.getItem('current-flow');
    if (savedFlow) {
      try {
        const parsedFlow = JSON.parse(savedFlow);
        if (parsedFlow.nodes && Array.isArray(parsedFlow.nodes) && parsedFlow.nodes.length > 0) {
          setNodes(parsedFlow.nodes);
        }
        if (parsedFlow.name) {
          setFlowName(parsedFlow.name);
        }
      } catch (e) {
        console.error('Error loading saved flow:', e);
      }
    }
  }, []);

  const addNode = (type: FlowNode['type'], x: number, y: number) => {
    const newNode: FlowNode = {
      id: `node_${Date.now()}`,
      type,
      data: {},
      position: { x, y },
      connections: [],
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
    
    if (connectionMode) {
      // If in connection mode, handle connection logic
      if (connectionStart === null) {
        // Start a connection
        setConnectionStart(nodeId);
        return;
      } else if (connectionStart !== nodeId) {
        // Complete a connection
        setNodes(prev => 
          prev.map(node => 
            node.id === connectionStart
              ? { ...node, connections: [...node.connections, nodeId] }
              : node
          )
        );
        
        toast({
          title: "Connection created",
          description: "Flow connection has been established",
        });
        
        setConnectionStart(null);
        return;
      }
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
    // Remove node and any connections to it
    setNodes(prev => {
      const updatedNodes = prev.filter(node => node.id !== id);
      
      // Remove connections to the deleted node
      return updatedNodes.map(node => ({
        ...node,
        connections: node.connections.filter(connId => connId !== id)
      }));
    });
  };

  const saveFlow = () => {
    if (!flowName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your flow",
        variant: "destructive",
      });
      return;
    }
    
    const flow = {
      id: `flow_${Date.now()}`,
      name: flowName,
      nodes,
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    localStorage.setItem('current-flow', JSON.stringify(flow));
    
    // Save to flows collection
    const savedFlows = localStorage.getItem('saved-flows') || '[]';
    try {
      const flows = JSON.parse(savedFlows);
      flows.push({ id: flow.id, name: flow.name, createdAt: flow.createdAt });
      localStorage.setItem('saved-flows', JSON.stringify(flows));
    } catch (e) {
      console.error('Error saving flow:', e);
    }
    
    toast({
      title: "Flow saved",
      description: `${flowName} has been saved successfully`,
    });
  };

  const exportFlow = () => {
    const flow = {
      name: flowName,
      nodes,
      createdAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(flow, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = `${flowName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const toggleConnectionMode = () => {
    setConnectionMode(!connectionMode);
    if (connectionMode) {
      setConnectionStart(null);
    }
    
    toast({
      title: connectionMode ? "Connection mode disabled" : "Connection mode enabled",
      description: connectionMode 
        ? "You can now drag nodes freely" 
        : "Click on nodes to create connections between them",
    });
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
            <label className="text-sm font-medium mt-2">Method</label>
            <Select 
              value={node.data.method || 'GET'} 
              onValueChange={(value) => updateNodeData(node.id, { method: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
        
      case 'llm':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">LLM Model</label>
            <Select 
              value={node.data.model || 'gpt-4o-mini'} 
              onValueChange={(value) => updateNodeData(node.id, { model: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                <SelectItem value="mistral-large">Mistral Large</SelectItem>
                <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
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
        
      case 'webhook':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Webhook URL</label>
            <Input 
              value={node.data.webhookUrl || ''} 
              onChange={(e) => updateNodeData(node.id, { webhookUrl: e.target.value })}
              placeholder="https://your-webhook-url.com" 
            />
            <label className="text-sm font-medium mt-2">Payload</label>
            <Textarea 
              value={node.data.body || ''} 
              onChange={(e) => updateNodeData(node.id, { body: e.target.value })}
              placeholder="{ 'key': 'value' }" 
              className="min-h-[60px]"
            />
          </div>
        );
        
      case 'delay':
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Delay (seconds)</label>
            <Input 
              type="number"
              min="1"
              value={node.data.delay || '5'} 
              onChange={(e) => updateNodeData(node.id, { delay: parseInt(e.target.value) })}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  // Function to render connections between nodes
  const renderConnections = () => {
    if (!canvasRef.current) return null;
    
    const connections: JSX.Element[] = [];
    
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return;
        
        // Source and target node positions
        const sourceX = node.position.x + 140; // Center of source node
        const sourceY = node.position.y; 
        const targetX = target.position.x + 140; // Center of target node
        const targetY = target.position.y;
        
        // Calculate control points for the curve (simple bezier)
        const midY = (sourceY + targetY) / 2;
        
        // Create SVG path
        const path = `M ${sourceX} ${sourceY} 
                       C ${sourceX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`;
        
        connections.push(
          <path
            key={`${node.id}-${targetId}`}
            d={path}
            className="flow-connection"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        );
      });
    });
    
    return (
      <svg 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" className="fill-primary" />
          </marker>
        </defs>
        {connections}
      </svg>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Input
            value={flowName}
            onChange={(e) => setFlowName(e.target.value)}
            className="text-lg font-medium w-64"
            placeholder="Flow Name"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={connectionMode ? "default" : "outline"} 
            onClick={toggleConnectionMode}
          >
            {connectionMode ? "Cancel Connection" : "Connect Nodes"}
          </Button>
          <Button onClick={saveFlow}>
            <SaveIcon className="w-4 h-4 mr-1" /> Save Flow
          </Button>
          <Button variant="outline" onClick={exportFlow}>
            Export
          </Button>
        </div>
      </div>
      
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
        <Button size="sm" variant="outline" onClick={() => handleAddNode('webhook')}>
          <PlusIcon className="w-4 h-4 mr-1" /> Webhook
        </Button>
        <Button size="sm" variant="outline" onClick={() => handleAddNode('delay')}>
          <PlusIcon className="w-4 h-4 mr-1" /> Delay
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
        {renderConnections()}
        
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`flow-node absolute ${connectionMode && connectionStart === node.id ? 'ring-2 ring-primary' : ''}`}
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
                  node.type === 'webhook' ? 'bg-purple-500' :
                  node.type === 'delay' ? 'bg-orange-500' :
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
