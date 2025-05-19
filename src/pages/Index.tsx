
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatsCard from "@/components/dashboard/StatsCard";
import { RecentAgents } from "@/components/dashboard/RecentAgents";
import { BotIcon, PlugIcon } from "@/components/icons/Icons";

const Index = () => {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatsCard
            title="Active Agents"
            value={2}
            icon={<BotIcon className="h-5 w-5 text-muted-foreground" />}
            description="Agents currently running"
          />
          <StatsCard
            title="Total Interactions"
            value="143"
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
            value="2"
            icon={<PlugIcon className="h-5 w-5 text-muted-foreground" />}
            description="WhatsApp, OpenRouter"
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

// Import Card component to fix build error
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
