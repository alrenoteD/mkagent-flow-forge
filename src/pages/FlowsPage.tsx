
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/components/icons/Icons";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

interface FlowItem {
  id: string;
  name: string;
  description?: string;
  lastModified?: string;
  createdAt: string;
  status: "active" | "inactive" | "draft";
}

const FlowsPage = () => {
  const [flows, setFlows] = useState<FlowItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load flows from localStorage
    const loadFlows = () => {
      try {
        const savedFlows = localStorage.getItem('saved-flows');
        if (savedFlows) {
          const parsedFlows = JSON.parse(savedFlows);
          setFlows(parsedFlows);
        }
      } catch (error) {
        console.error("Error loading flows:", error);
        toast.error("Failed to load your flows");
      }
    };

    loadFlows();
    
    // Add event listener to refresh flows when localStorage changes
    window.addEventListener('storage', loadFlows);
    
    return () => {
      window.removeEventListener('storage', loadFlows);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDeleteFlow = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    try {
      const savedFlows = JSON.parse(localStorage.getItem('saved-flows') || '[]');
      const updatedFlows = savedFlows.filter((flow: FlowItem) => flow.id !== id);
      localStorage.setItem('saved-flows', JSON.stringify(updatedFlows));
      setFlows(updatedFlows);
      toast.success("Flow deleted successfully");
    } catch (error) {
      console.error("Error deleting flow:", error);
      toast.error("Failed to delete flow");
    }
  };

  const filteredFlows = flows.filter(flow => 
    flow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Agent Flows</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your AI agent workflows
            </p>
          </div>
          <Link to="/flows/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" /> Create New Flow
            </Button>
          </Link>
        </div>

        <div className="flex mb-6">
          <Input 
            placeholder="Search flows..." 
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredFlows.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-lg font-medium">No flows found</h3>
            <p className="text-muted-foreground mt-1">
              {searchTerm ? "No flows match your search criteria" : "Create your first flow to get started"}
            </p>
            <Link to="/templates" className="mt-4 inline-block">
              <Button variant="outline" className="mt-4">
                Browse Templates
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredFlows.map((flow) => (
              <Card key={flow.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <Link to={`/flows/${flow.id}`}>
                    <div className="p-6 flex justify-between items-center hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-lg">{flow.name}</h3>
                          <Badge 
                            variant={
                              flow.status === "active" ? "default" : 
                              flow.status === "draft" ? "outline" : 
                              "secondary"
                            }
                          >
                            {flow.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{flow.description || "No description provided"}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {formatDate(flow.createdAt)}
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground mr-2"
                          onClick={(e) => handleDeleteFlow(flow.id, e)}
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </Button>
                        
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-muted-foreground"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FlowsPage;
