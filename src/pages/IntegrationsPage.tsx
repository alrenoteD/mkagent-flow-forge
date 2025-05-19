
import Layout from "@/components/Layout";
import { useState } from "react";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const IntegrationsPage = () => {
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [isOpenRouterDialogOpen, setIsOpenRouterDialogOpen] = useState(false);
  const [whatsappConnected, setWhatsAppConnected] = useState(false);
  const [openRouterConnected, setOpenRouterConnected] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleWhatsAppConnect = () => {
    setIsWhatsAppDialogOpen(true);
  };

  const handleOpenRouterConnect = () => {
    setIsOpenRouterDialogOpen(true);
  };

  const handleWhatsAppSubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    setWhatsAppConnected(true);
    setApiKey("");
    setIsWhatsAppDialogOpen(false);
    
    toast({
      title: "WhatsApp Connected",
      description: "WhatsApp integration has been successfully set up.",
    });
  };

  const handleOpenRouterSubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }
    
    setOpenRouterConnected(true);
    setApiKey("");
    setIsOpenRouterDialogOpen(false);
    
    toast({
      title: "OpenRouter Connected",
      description: "OpenRouter integration has been successfully set up.",
    });
  };

  const handleWhatsAppDisconnect = () => {
    setWhatsAppConnected(false);
    toast({
      title: "WhatsApp Disconnected",
      description: "WhatsApp integration has been disabled.",
    });
  };

  const handleOpenRouterDisconnect = () => {
    setOpenRouterConnected(false);
    toast({
      title: "OpenRouter Disconnected",
      description: "OpenRouter integration has been disabled.",
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your agents to messaging platforms and LLM providers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard
            title="WhatsApp"
            description="Connect your agents to WhatsApp using Twilio, Z-API, or the official Meta API"
            icon={
              <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6">
                <path d="M713.5 599.9c-10.9-5.6-65.2-32.2-75.3-35.8-10.1-3.8-17.5-5.6-24.8 5.6-7.4 11.1-28.4 35.8-35 43.3-6.4 7.4-12.9 8.3-23.8 2.8-64.8-32.4-107.3-57.8-150-131.1-11.3-19.5 11.3-18.1 32.4-60.2 3.6-7.4 1.8-13.7-1-19.3-2.8-5.6-24.8-59.8-34-81.9-9-21.9-18.1-18.9-24.8-19.2-6.4-.2-13.7-.2-21.1-.2-7.4 0-19.3 2.8-29.4 13.7-10.1 11.1-38.6 37.8-38.6 92s39.5 106.7 44.9 114.1c5.6 7.4 77.9 118.9 188.9 167 26.4 11.4 47 18.3 63.1 23.4 26.5 8.4 50.6 7.2 69.7 4.3 21.3-3.1 65.2-26.4 74.3-52.5 9-25.9 9-48.4 6.4-53.1-2.7-4.9-10.1-7.7-21-13z" />
                <path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3-41.3-41.3-89.5-73.8-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9-53.3 22.8-101.1 55.2-142 96.5-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9.3 69.4 16.9 138.3 48 199.9v152c0 25.4 20.6 46 46 46h152.1c61.6 31.1 130.5 47.7 199.9 48h2.1c59.9 0 118-11.6 172.7-34.3 53.5-22.3 101.6-54.3 142.8-95.2 41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" />
              </svg>
            }
            isConnected={whatsappConnected}
            onConnect={handleWhatsAppConnect}
            onDisconnect={handleWhatsAppDisconnect}
          />
          
          <IntegrationCard
            title="OpenRouter"
            description="Access multiple LLM providers through a single API"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            isConnected={openRouterConnected}
            onConnect={handleOpenRouterConnect}
            onDisconnect={handleOpenRouterDisconnect}
          />
          
          <IntegrationCard
            title="HuggingFace Inference API"
            description="Access HuggingFace models via their hosted inference API"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            }
            isConnected={false}
            onConnect={() => {}}
            onDisconnect={() => {}}
          />
        </div>
      </div>
      
      {/* WhatsApp Integration Dialog */}
      <Dialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect WhatsApp Integration</DialogTitle>
            <DialogDescription>
              Enter your Twilio or Z-API credentials to connect your WhatsApp account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                Provider
              </Label>
              <select id="provider" className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="twilio">Twilio</option>
                <option value="zapi">Z-API</option>
                <option value="meta">Meta API</option>
                <option value="360dialog">360Dialog</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWhatsAppDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWhatsAppSubmit}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* OpenRouter Integration Dialog */}
      <Dialog open={isOpenRouterDialogOpen} onOpenChange={setIsOpenRouterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect OpenRouter</DialogTitle>
            <DialogDescription>
              Enter your OpenRouter API key to access multiple LLM models.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="openRouterKey" className="text-right">
                API Key
              </Label>
              <Input
                id="openRouterKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpenRouterDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleOpenRouterSubmit}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default IntegrationsPage;
