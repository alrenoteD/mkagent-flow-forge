
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@/components/icons/Icons";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface FlowItem {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: "active" | "inactive" | "draft";
}

const mockFlows: FlowItem[] = [
  {
    id: "flow-1",
    name: "Customer Support Bot",
    description: "Handles simple customer queries and routes complex ones to human agents",
    lastModified: "2023-05-18T10:30:00Z",
    status: "active"
  },
  {
    id: "flow-2",
    name: "Appointment Scheduler",
    description: "Books appointments and sends reminders to clients",
    lastModified: "2023-05-15T14:22:00Z",
    status: "active"
  },
  {
    id: "flow-3",
    name: "Product Recommendation Agent",
    description: "Suggests products based on customer preferences",
    lastModified: "2023-05-10T09:15:00Z",
    status: "draft"
  },
  {
    id: "flow-4",
    name: "Lead Generation Bot",
    description: "Collects information from potential customers",
    lastModified: "2023-05-05T16:45:00Z",
    status: "inactive"
  }
];

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

const FlowsPage = () => {
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
          />
        </div>

        <div className="grid gap-6">
          {mockFlows.map((flow) => (
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
                      <p className="text-muted-foreground">{flow.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Last modified: {formatDate(flow.lastModified)}
                      </p>
                    </div>
                    
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
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FlowsPage;
