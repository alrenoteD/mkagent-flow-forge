
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, BookOpenIcon, CopyIcon, ArrowRightIcon, QuestionIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  content?: any;
}

const templates: Template[] = [
  {
    id: "template-1",
    title: "Customer Support Bot",
    description: "A bot that handles basic customer service inquiries and routes complex questions to human agents.",
    category: "business",
    difficulty: "beginner",
    content: {
      name: "Customer Support Bot",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Hello! I'm your customer support assistant. How can I help you today?"
          },
          position: { x: 100, y: 100 },
          connections: ["user_input"]
        },
        {
          id: "user_input",
          type: "input",
          data: {
            variable: "user_query",
            content: "Please describe your issue"
          },
          position: { x: 100, y: 250 },
          connections: ["process_query"]
        },
        {
          id: "process_query",
          type: "llm",
          data: {
            model: "gpt-4o-mini",
            prompt: "The user has said: {{user_query}}. Determine if this is a simple question that can be answered automatically, or if it needs to be routed to a human agent. If it's simple, provide a helpful response. If it's complex, indicate that a human agent is needed."
          },
          position: { x: 100, y: 400 },
          connections: []
        }
      ]
    }
  },
  {
    id: "template-2",
    title: "Appointment Scheduler",
    description: "Helps users book and manage appointments through conversational interface.",
    category: "business",
    difficulty: "intermediate",
    content: {
      name: "Appointment Scheduler",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Hi there! I can help you schedule an appointment. What type of appointment are you looking for?"
          },
          position: { x: 100, y: 100 },
          connections: ["appointment_type"]
        },
        {
          id: "appointment_type",
          type: "input",
          data: {
            variable: "appointment_type",
            content: "Please specify what kind of appointment you need"
          },
          position: { x: 100, y: 250 },
          connections: ["date_question"]
        },
        {
          id: "date_question",
          type: "message",
          data: {
            content: "When would you like to schedule your {{appointment_type}} appointment?"
          },
          position: { x: 100, y: 400 },
          connections: ["date_input"]
        },
        {
          id: "date_input",
          type: "input",
          data: {
            variable: "appointment_date",
            content: "Please provide your preferred date"
          },
          position: { x: 100, y: 550 },
          connections: ["confirmation"]
        },
        {
          id: "confirmation",
          type: "message",
          data: {
            content: "Great! I've scheduled your {{appointment_type}} appointment for {{appointment_date}}. Is there anything else you need?"
          },
          position: { x: 100, y: 700 },
          connections: []
        }
      ]
    }
  },
  {
    id: "template-3",
    title: "Product Catalog Browser",
    description: "Allows users to browse and search your product catalog via chat.",
    category: "commerce",
    difficulty: "intermediate",
    content: {
      name: "Product Catalog Browser",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Welcome to our product catalog! What type of products are you interested in today?"
          },
          position: { x: 100, y: 100 },
          connections: ["category_input"]
        },
        {
          id: "category_input",
          type: "input",
          data: {
            variable: "product_category",
            content: "Please specify a product category or describe what you're looking for"
          },
          position: { x: 100, y: 250 },
          connections: ["fetch_products"]
        },
        {
          id: "fetch_products",
          type: "api",
          data: {
            endpoint: "https://api.yourstore.com/products?category={{product_category}}",
            method: "GET"
          },
          position: { x: 100, y: 400 },
          connections: ["show_products"]
        },
        {
          id: "show_products",
          type: "llm",
          data: {
            model: "gpt-4o-mini",
            prompt: "Format the following product data into a neat, readable list for the customer: {{api_response}}. Include the name, price, and a brief description for each product."
          },
          position: { x: 100, y: 550 },
          connections: []
        }
      ]
    }
  },
  {
    id: "template-4",
    title: "Lead Generation Bot",
    description: "Gathers user information and qualifies leads before human follow-up.",
    category: "marketing",
    difficulty: "beginner",
    content: {
      name: "Lead Generation Bot",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Hi there! I'd like to learn more about your needs so we can help you better. Would you mind answering a few questions?"
          },
          position: { x: 100, y: 100 },
          connections: ["name_input"]
        },
        {
          id: "name_input",
          type: "input",
          data: {
            variable: "customer_name",
            content: "What's your name?"
          },
          position: { x: 100, y: 250 },
          connections: ["email_input"]
        },
        {
          id: "email_input",
          type: "input",
          data: {
            variable: "customer_email",
            content: "What's your email address?"
          },
          position: { x: 100, y: 400 },
          connections: ["need_input"]
        },
        {
          id: "need_input",
          type: "input",
          data: {
            variable: "customer_need",
            content: "What specific products or services are you interested in?"
          },
          position: { x: 100, y: 550 },
          connections: ["thank_you"]
        },
        {
          id: "thank_you",
          type: "message",
          data: {
            content: "Thank you, {{customer_name}}! We'll have one of our specialists contact you at {{customer_email}} regarding your interest in {{customer_need}}."
          },
          position: { x: 100, y: 700 },
          connections: ["webhook_notify"]
        },
        {
          id: "webhook_notify",
          type: "webhook",
          data: {
            webhookUrl: "https://your-crm.com/leads",
            method: "POST",
            body: "{\"name\": \"{{customer_name}}\", \"email\": \"{{customer_email}}\", \"interest\": \"{{customer_need}}\"}"
          },
          position: { x: 100, y: 850 },
          connections: []
        }
      ]
    }
  },
  {
    id: "template-5",
    title: "FAQ Assistant",
    description: "Answers common questions using a knowledge base of frequently asked questions.",
    category: "support",
    difficulty: "beginner",
    content: {
      name: "FAQ Assistant",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Hello! I'm your FAQ assistant. Ask me any question about our products or services!"
          },
          position: { x: 100, y: 100 },
          connections: ["user_question"]
        },
        {
          id: "user_question",
          type: "input",
          data: {
            variable: "user_query",
            content: "What would you like to know?"
          },
          position: { x: 100, y: 250 },
          connections: ["llm_answer"]
        },
        {
          id: "llm_answer",
          type: "llm",
          data: {
            model: "gpt-4o-mini",
            prompt: "Answer the following user question about our product/service: {{user_query}}\n\nBase your answers on these FAQs:\n1. Q: How do I return a product? A: You can return any product within 30 days with receipt for a full refund.\n2. Q: What are your business hours? A: We're open Monday-Friday 9am-6pm and Saturday 10am-4pm.\n3. Q: Do you ship internationally? A: Yes, we ship to over 50 countries worldwide.\n4. Q: How can I track my order? A: You can track your order using the link sent in your shipping confirmation email.\n5. Q: Do you offer warranties? A: All electronics come with a 1-year manufacturer warranty."
          },
          position: { x: 100, y: 400 },
          connections: ["follow_up"]
        },
        {
          id: "follow_up",
          type: "message",
          data: {
            content: "Is there anything else you'd like to know?"
          },
          position: { x: 100, y: 550 },
          connections: ["user_question"]
        }
      ]
    }
  },
  {
    id: "template-6",
    title: "Personalized Recommendations",
    description: "Provides tailored product or content recommendations based on user preferences.",
    category: "commerce",
    difficulty: "advanced",
    content: {
      name: "Personalized Recommendations Bot",
      nodes: [
        {
          id: "start",
          type: "message",
          data: {
            content: "Hi there! I can help recommend products based on your preferences. To get started, I'll ask you a few questions."
          },
          position: { x: 100, y: 100 },
          connections: ["preference_input"]
        },
        {
          id: "preference_input",
          type: "input",
          data: {
            variable: "preferences",
            content: "What types of products are you interested in today?"
          },
          position: { x: 100, y: 250 },
          connections: ["budget_input"]
        },
        {
          id: "budget_input",
          type: "input",
          data: {
            variable: "budget",
            content: "What's your approximate budget?"
          },
          position: { x: 100, y: 400 },
          connections: ["style_input"]
        },
        {
          id: "style_input",
          type: "input",
          data: {
            variable: "style_preference",
            content: "Do you have any preferred styles, brands, or features?"
          },
          position: { x: 100, y: 550 },
          connections: ["recommend"]
        },
        {
          id: "recommend",
          type: "llm",
          data: {
            model: "gpt-4o",
            prompt: "You are a sophisticated product recommendation system. Based on the following customer preferences, generate 3-5 personalized product recommendations.\n\nCustomer is interested in: {{preferences}}\nBudget: {{budget}}\nStyle/Feature Preferences: {{style_preference}}\n\nFor each recommendation, include:\n- Product name\n- Key features (2-3 bullet points)\n- Price range\n- Why this specifically matches their needs"
          },
          position: { x: 100, y: 700 },
          connections: ["feedback"]
        },
        {
          id: "feedback",
          type: "input",
          data: {
            variable: "user_feedback",
            content: "How do these recommendations sound? Would you like more specific options?"
          },
          position: { x: 100, y: 850 },
          connections: ["refine"]
        },
        {
          id: "refine",
          type: "llm",
          data: {
            model: "gpt-4o",
            prompt: "The customer provided this feedback on your recommendations: {{user_feedback}}\n\nBased on their initial preferences ({{preferences}}, budget: {{budget}}, style: {{style_preference}}) and this new feedback, refine your recommendations. If they liked your suggestions, provide more detail on how to purchase. If they want something different, provide new alternatives that address their feedback."
          },
          position: { x: 100, y: 1000 },
          connections: []
        }
      ]
    }
  }
];

const TemplatesPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const filteredTemplates = filter 
    ? templates.filter(template => template.category === filter || template.difficulty === filter)
    : templates;
    
  const categories = Array.from(new Set(templates.map(t => t.category)));
  const difficulties = ["beginner", "intermediate", "advanced"];
  
  const handleUseTemplate = (template: Template) => {
    const flowData = {
      id: `flow_${Date.now()}`,
      name: template.title,
      nodes: template.content.nodes,
      createdAt: new Date().toISOString(),
    };
    
    // Store the flow in localStorage
    localStorage.setItem('current-flow', JSON.stringify(flowData));
    
    // Update active flows count
    const savedFlows = JSON.parse(localStorage.getItem('saved-flows') || '[]');
    savedFlows.push({
      id: flowData.id,
      name: flowData.name,
      createdAt: flowData.createdAt,
      status: "draft"
    });
    localStorage.setItem('saved-flows', JSON.stringify(savedFlows));
    
    toast.success("Template selected! Creating a new flow based on this template.");
    navigate("/flows/new");
  };

  const handleTemplateDetails = (template: Template) => {
    setSelectedTemplate(template);
  };

  const copyTemplate = (template: Template) => {
    navigator.clipboard.writeText(JSON.stringify(template.content, null, 2));
    toast.success("Template JSON copied to clipboard!");
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Templates Gallery</h1>
            <p className="text-muted-foreground mt-1">
              Pre-built agent templates to help you get started quickly
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setFaqDialogOpen(true)}>
              <QuestionIcon className="h-4 w-4 mr-2" />
              FAQs
            </Button>
            <Button onClick={() => setHelpDialogOpen(true)}>
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Usage Guide
            </Button>
          </div>
        </div>

        <Alert className="mb-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Looking to deploy your templates?</AlertTitle>
          <AlertDescription>
            Check out our <Link to="/deployment-guide" className="text-primary underline">deployment guide</Link> to learn how to run MKagent with internet access.
          </AlertDescription>
        </Alert>
        
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filter === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          
          <div className="border-r mr-2 pr-2">
            {categories.map(category => (
              <Button 
                key={category}
                variant={filter === category ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter(category)}
                className="capitalize mr-2"
              >
                {category}
              </Button>
            ))}
          </div>
          
          {difficulties.map(difficulty => (
            <Button 
              key={difficulty}
              variant={filter === difficulty ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setFilter(difficulty)}
              className="capitalize"
            >
              {difficulty}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{template.title}</CardTitle>
                  <Badge variant="outline" className="capitalize">
                    {template.category}
                  </Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">Difficulty:</span>
                  <Badge variant="secondary" className="capitalize">
                    {template.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => copyTemplate(template)}
                >
                  <CopyIcon className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => handleTemplateDetails(template)}
                >
                  <InfoIcon className="h-4 w-4 mr-2" />
                  Details
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => handleUseTemplate(template)}
                >
                  <ArrowRightIcon className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 border rounded-lg p-6 bg-muted/20">
          <div className="flex items-center mb-4">
            <BookOpenIcon className="h-5 w-5 mr-2" />
            <h2 className="text-xl font-semibold">How to use templates</h2>
          </div>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li>Browse the templates gallery and find one that matches your needs</li>
            <li>Click "Use Template" to create a new flow based on the template</li>
            <li>Customize the template in the flow editor to fit your specific requirements</li>
            <li>Deploy your agent using our deployment guide</li>
          </ol>
        </div>

        {/* Template Details Dialog */}
        {selectedTemplate && (
          <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedTemplate.title}
                  <Badge variant="outline" className="capitalize">
                    {selectedTemplate.category}
                  </Badge>
                  <Badge variant="secondary" className="capitalize">
                    {selectedTemplate.difficulty}
                  </Badge>
                </DialogTitle>
                <DialogDescription>{selectedTemplate.description}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <h4 className="font-semibold">Flow Structure</h4>
                <div className="bg-muted rounded-md p-4 overflow-auto max-h-[300px]">
                  <pre className="text-xs">{JSON.stringify(selectedTemplate.content.nodes, null, 2)}</pre>
                </div>
                
                <h4 className="font-semibold mt-4">Implementation Notes</h4>
                <p className="text-sm text-muted-foreground">
                  This template creates a {selectedTemplate.title.toLowerCase()} using {selectedTemplate.content.nodes.length} nodes.
                  It's designed for {selectedTemplate.difficulty} users and focuses on {selectedTemplate.category} use cases.
                </p>
                
                <h4 className="font-semibold mt-4">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {selectedTemplate.content.nodes.some(n => n.type === "llm") && (
                    <li>Requires LLM integration (see Integrations page)</li>
                  )}
                  {selectedTemplate.content.nodes.some(n => n.type === "api") && (
                    <li>Requires API endpoint configuration</li>
                  )}
                  {selectedTemplate.content.nodes.some(n => n.type === "webhook") && (
                    <li>Requires webhook endpoint setup</li>
                  )}
                  <li>WhatsApp or other messaging channel for deployment</li>
                </ul>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => copyTemplate(selectedTemplate)}>
                  <CopyIcon className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
                <Button onClick={() => {
                  handleUseTemplate(selectedTemplate);
                  setSelectedTemplate(null);
                }}>
                  <ArrowRightIcon className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Usage Guide Dialog */}
        <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>MKagent Usage Guide</DialogTitle>
              <DialogDescription>
                Comprehensive guide to creating, deploying, and managing your conversational agents
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 my-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
                <p className="text-muted-foreground">
                  MKagent is a platform for creating and deploying conversational agents that can interact with users through WhatsApp and other channels. Here's how to get started:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Browse and select a template from our Templates Gallery</li>
                  <li>Customize the flow in the Visual Flow Editor</li>
                  <li>Configure integrations for messaging and AI capabilities</li>
                  <li>Deploy your agent to start handling conversations</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">Creating Your Bot</h3>
                <p className="text-muted-foreground">
                  You can create a bot from scratch or use one of our templates. The flow editor allows you to create a conversational flow with various node types:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li><span className="font-medium">Message nodes</span>: Send static messages to users</li>
                  <li><span className="font-medium">Input nodes</span>: Collect information from users</li>
                  <li><span className="font-medium">Condition nodes</span>: Create branches based on user input</li>
                  <li><span className="font-medium">LLM nodes</span>: Use AI to generate dynamic responses</li>
                  <li><span className="font-medium">API nodes</span>: Fetch data from external services</li>
                  <li><span className="font-medium">Webhook nodes</span>: Send data to other systems</li>
                  <li><span className="font-medium">Delay nodes</span>: Add pauses between messages</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">Bot Storage</h3>
                <p className="text-muted-foreground">
                  MKagent stores your bot flows and configurations in the following locations:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li><span className="font-medium">Local Storage</span>: Bot flows and configurations are stored in your browser's localStorage</li>
                  <li><span className="font-medium">Export/Import</span>: You can export your flows as JSON files for backup or sharing</li>
                  <li><span className="font-medium">For Production</span>: When deploying, flows can be stored in a JSON file or database</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  To keep your bots safe, regularly export your flows and store them securely.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">Deploying Your Bot</h3>
                <p className="text-muted-foreground">
                  MKagent supports various deployment options:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li><span className="font-medium">Local Deployment</span>: Run on your computer with ngrok for testing</li>
                  <li><span className="font-medium">Cloud Deployment</span>: Deploy to services like Replit, Railway, or Render</li>
                  <li><span className="font-medium">Webhook Configuration</span>: Connect messaging platforms to your deployed bot</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  See our <Link to="/deployment-guide" className="text-primary underline">Deployment Guide</Link> for detailed instructions.
                </p>
              </section>
              
              <section>
                <h3 className="text-lg font-semibold mb-2">Making Your Bot Functional</h3>
                <p className="text-muted-foreground">
                  To make your bot fully functional, you'll need to:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Configure messaging integrations (WhatsApp, Telegram, etc.)</li>
                  <li>Set up AI provider accounts (OpenAI, HuggingFace, etc.)</li>
                  <li>Create API keys and add them to your integration settings</li>
                  <li>Deploy your bot to a server with 24/7 uptime</li>
                  <li>Test your bot thoroughly before sharing with users</li>
                </ol>
              </section>
            </div>
          </DialogContent>
        </Dialog>

        {/* FAQ Dialog */}
        <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Frequently Asked Questions</DialogTitle>
              <DialogDescription>
                Common questions about using MKagent for bot creation
              </DialogDescription>
            </DialogHeader>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I connect my bot to WhatsApp?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    To connect your bot to WhatsApp, you need to use a WhatsApp API provider. MKagent supports several options:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Twilio API (paid, reliable service)</li>
                    <li>Z-API (Brazilian service with good features)</li>
                    <li>Meta WhatsApp Business API (requires business verification)</li>
                    <li>360Dialog or UltraMsg (alternative providers)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Go to the Integrations page to configure your WhatsApp connection with your provider's API credentials.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Where are my bots stored?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    MKagent stores your bot flows and configurations in the following locations:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>During development: In your browser's localStorage</li>
                    <li>After deployment: In JSON files or a database on your server</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    We recommend regularly exporting your flows as JSON files for backup. You can do this from the Flow Editor using the Export button.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I run my bot locally for testing?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can run your bot locally for testing. Here's how:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Save your flow in the editor</li>
                    <li>Run the MKagent application locally using Node.js</li>
                    <li>Use ngrok to create a public URL for your local server</li>
                    <li>Configure your WhatsApp provider to send messages to your ngrok URL</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-2">
                    See our Deployment Guide for detailed instructions on local testing.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What AI models can I use with MKagent?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    MKagent supports various AI models through these integrations:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>OpenAI (GPT-3.5, GPT-4, etc.)</li>
                    <li>OpenRouter (access to multiple models)</li>
                    <li>HuggingFace (open-source models)</li>
                    <li>Claude (Anthropic's models)</li>
                    <li>Local models via Ollama (requires setup)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Configure your AI provider in the Integrations page by adding your API keys.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I deploy my bot to a server?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    You can deploy your MKagent bot to various hosting platforms:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><span className="font-medium">Replit</span>: Easy setup, free tier available</li>
                    <li><span className="font-medium">Railway</span>: Simple deployment, good performance</li>
                    <li><span className="font-medium">Render</span>: Another good cloud option</li>
                    <li><span className="font-medium">VPS/Dedicated server</span>: For complete control</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Each platform requires slightly different steps. Check our Deployment Guide for platform-specific instructions.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Can I use MKagent without a server?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    No, MKagent requires a server to run your bot so it can receive and respond to messages. However, you have several options:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Use a free hosting service like Replit</li>
                    <li>Run on your own computer temporarily with ngrok for testing</li>
                    <li>Use low-cost cloud services like Railway or Render</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Without a server running 24/7, your bot won't be able to respond to messages continuously.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>How do I connect external APIs to my bot?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    You can connect external APIs to your bot using API nodes in the flow editor:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Add an API node to your flow</li>
                    <li>Configure the endpoint URL, method (GET, POST, etc.), and headers</li>
                    <li>Use variables like <code>&#123;&#123;user_input&#125;&#125;</code> in your URL or body to send dynamic data</li>
                    <li>Access the API response in subsequent nodes using <code>&#123;&#123;api_response&#125;&#125;</code></li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-2">
                    Make sure your API allows cross-origin requests or deploy your bot to handle the API calls server-side.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-8">
                <AccordionTrigger>How do I make my bot handle human handoff?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    To implement human handoff (transferring the conversation to a human agent):
                  </p>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Create a condition node to detect when handoff is needed</li>
                    <li>Add a webhook node to notify your CRM or support system</li>
                    <li>Use a message node to inform the user they'll be connected to an agent</li>
                    <li>Configure your webhook to include all relevant conversation context</li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-2">
                    You'll need to integrate with your existing support system or CRM to route the conversation to the right human agent.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TemplatesPage;
