
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, BookOpenIcon, CopyIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const templates: Template[] = [
  {
    id: "template-1",
    title: "Customer Support Bot",
    description: "A bot that handles basic customer service inquiries and routes complex questions to human agents.",
    category: "business",
    difficulty: "beginner"
  },
  {
    id: "template-2",
    title: "Appointment Scheduler",
    description: "Helps users book and manage appointments through conversational interface.",
    category: "business",
    difficulty: "intermediate"
  },
  {
    id: "template-3",
    title: "Product Catalog Browser",
    description: "Allows users to browse and search your product catalog via chat.",
    category: "commerce",
    difficulty: "intermediate"
  },
  {
    id: "template-4",
    title: "Lead Generation Bot",
    description: "Gathers user information and qualifies leads before human follow-up.",
    category: "marketing",
    difficulty: "beginner"
  },
  {
    id: "template-5",
    title: "FAQ Assistant",
    description: "Answers common questions using a knowledge base of frequently asked questions.",
    category: "support",
    difficulty: "beginner"
  },
  {
    id: "template-6",
    title: "Personalized Recommendations",
    description: "Provides tailored product or content recommendations based on user preferences.",
    category: "commerce",
    difficulty: "advanced"
  }
];

const TemplatesPage = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredTemplates = filter 
    ? templates.filter(template => template.category === filter || template.difficulty === filter)
    : templates;
    
  const categories = Array.from(new Set(templates.map(t => t.category)));
  const difficulties = ["beginner", "intermediate", "advanced"];
  
  const handleUseTemplate = (templateId: string) => {
    // In a real implementation, this would create a new flow based on the template
    toast.success("Template selected! Creating a new flow based on this template.");
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Templates Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Pre-built agent templates to help you get started quickly
          </p>
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
                  onClick={() => {
                    toast.success("Template copied to clipboard!");
                  }}
                >
                  <CopyIcon className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => handleUseTemplate(template.id)}
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
      </div>
    </Layout>
  );
};

export default TemplatesPage;
