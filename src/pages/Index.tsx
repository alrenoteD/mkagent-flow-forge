
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatsCard from "@/components/dashboard/StatsCard";
import { RecentAgents } from "@/components/dashboard/RecentAgents";
import { BotIcon, PlugIcon } from "@/components/icons/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Index = () => {
  const [activeAgents, setActiveAgents] = useState(0);
  const [totalInteractions, setTotalInteractions] = useState(0);
  const [connectedIntegrations, setConnectedIntegrations] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Load stats from localStorage
    try {
      const savedFlows = JSON.parse(localStorage.getItem('saved-flows') || '[]');
      const activeCount = savedFlows.filter((flow: any) => flow.status === 'active').length;
      setActiveAgents(activeCount);
      
      // Check if this is a new user
      setIsNewUser(savedFlows.length === 0);
      
      // Load interactions (placeholder, would come from backend in real implementation)
      const interactions = localStorage.getItem('total-interactions') || '0';
      setTotalInteractions(parseInt(interactions));
      
      // Load integrations (placeholder, would come from backend in real implementation)
      const integrations = localStorage.getItem('connected-integrations') || '0';
      setConnectedIntegrations(parseInt(integrations));
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  }, []);

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome to MKagent</h1>
            <p className="text-muted-foreground mt-1">
              Your personal platform for creating and managing AI agents
            </p>
          </div>
          <Link to="/flows/new">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Create New Agent
            </Button>
          </Link>
        </div>

        {isNewUser && (
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Welcome to MKagent!</AlertTitle>
            <AlertDescription>
              Get started by browsing our <Link to="/templates" className="text-primary underline">templates gallery</Link> or creating a new agent from scratch.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatsCard
            title="Active Agents"
            value={activeAgents}
            icon={<BotIcon className="h-5 w-5 text-muted-foreground" />}
            description="Agents currently running"
          />
          <StatsCard
            title="Total Interactions"
            value={totalInteractions.toString()}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-muted-foreground"
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
              </svg>
            }
            description="Messages exchanged today"
          />
          <StatsCard
            title="Connected Integrations"
            value={connectedIntegrations.toString()}
            icon={<PlugIcon className="h-5 w-5 text-muted-foreground" />}
            description={connectedIntegrations > 0 ? "WhatsApp, OpenRouter" : "No integrations configured"}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <RecentAgents />
          
          <Card className="col-span-3 md:col-span-1">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/docs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    Documentation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/templates">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    Templates Gallery
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/integrations">
                    <PlugIcon className="mr-2 h-4 w-4" />
                    Manage Integrations
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/deployment-guide">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                    Deployment Guide
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
