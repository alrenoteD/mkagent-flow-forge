
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HomeIcon, BotIcon, PlugIcon, SettingsIcon } from './icons/Icons';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [activeIntegrations, setActiveIntegrations] = useState<string[]>([]);
  
  useEffect(() => {
    // Check which integrations are connected
    const connections = [];
    
    if (localStorage.getItem("whatsapp-provider")) connections.push("whatsapp");
    if (localStorage.getItem("openrouter-api-key")) connections.push("openrouter");
    if (localStorage.getItem("huggingface-api-key")) connections.push("huggingface");
    
    setActiveIntegrations(connections);
  }, []);
  
  return (
    <aside className="w-64 bg-sidebar border-r border-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BotIcon className="h-6 w-6" />
          <span>MKagent</span>
        </h1>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Your personal AI agent platform</p>
      </div>
      
      <nav className="py-6 flex-1">
        <ul className="space-y-1 px-2">
          <li>
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/flows">
              <Button 
                variant={location.pathname.startsWith('/flows') ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Agent Flows
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/integrations">
              <Button 
                variant={location.pathname.startsWith('/integrations') ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <PlugIcon className="mr-2 h-5 w-5" />
                Integrations
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/templates">
              <Button 
                variant={location.pathname.startsWith('/templates') ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Templates
              </Button>
            </Link>
          </li>
        </ul>
        
        {activeIntegrations.length > 0 && (
          <div className="px-2 py-4 mt-6">
            <h2 className="px-4 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
              Active Integrations
            </h2>
            <ul className="mt-2 space-y-1">
              {activeIntegrations.includes("whatsapp") && (
                <li>
                  <Link to="/integrations">
                    <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      WhatsApp
                    </Button>
                  </Link>
                </li>
              )}
              {activeIntegrations.includes("openrouter") && (
                <li>
                  <Link to="/integrations">
                    <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      OpenRouter
                    </Button>
                  </Link>
                </li>
              )}
              {activeIntegrations.includes("huggingface") && (
                <li>
                  <Link to="/integrations">
                    <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                      HuggingFace
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <Link to="/settings">
          <Button 
            variant={location.pathname === '/settings' ? "default" : "outline"} 
            className="w-full justify-start"
          >
            <SettingsIcon className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
