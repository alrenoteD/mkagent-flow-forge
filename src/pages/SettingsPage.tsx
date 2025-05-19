
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SettingsPage = () => {
  const [serverUrl, setServerUrl] = useState("http://localhost:8000");
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  const handleSaveServerSettings = () => {
    localStorage.setItem("mkagent-server-url", serverUrl);
    toast({
      title: "Settings saved",
      description: "Your server settings have been saved."
    });
  };

  const handleSaveWebhookSettings = () => {
    localStorage.setItem("mkagent-webhook-url", webhookUrl);
    toast({
      title: "Webhook settings saved",
      description: "Your webhook URL has been saved."
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your MKagent platform settings
          </p>
        </div>

        <Tabs defaultValue="server">
          <TabsList className="mb-6">
            <TabsTrigger value="server">Server Settings</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>
          
          <TabsContent value="server">
            <Card>
              <CardHeader>
                <CardTitle>Server Configuration</CardTitle>
                <CardDescription>
                  Configure your local or remote server connection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="server-url">Server URL</Label>
                  <Input 
                    id="server-url" 
                    value={serverUrl} 
                    onChange={(e) => setServerUrl(e.target.value)} 
                    placeholder="http://localhost:8000"
                  />
                  <p className="text-sm text-muted-foreground">
                    This is the URL where your MKagent server is running
                  </p>
                </div>
                
                <Button onClick={handleSaveServerSettings}>Save Server Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Settings</CardTitle>
                <CardDescription>
                  Configure incoming webhooks for external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Default Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    value={webhookUrl} 
                    onChange={(e) => setWebhookUrl(e.target.value)} 
                    placeholder="https://your-webhook-url"
                  />
                  <p className="text-sm text-muted-foreground">
                    This webhook will receive events from your MKagent when configured
                  </p>
                </div>
                
                <Button onClick={handleSaveWebhookSettings}>Save Webhook Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>
                  Export and import your agents, flows and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button>Export All Data</Button>
                  <Button variant="outline">Import Data</Button>
                </div>
                
                <div className="border border-border rounded-md p-4 mt-4">
                  <h3 className="font-medium mb-2">Scheduled Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Coming soon: Configure automated backups to local storage or cloud services
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;
