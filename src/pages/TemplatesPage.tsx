
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Templates Gallery</h1>
          <p className="text-muted-foreground mt-1">
            Pre-built agent templates to help you get started quickly
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
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
              <CardFooter className="bg-muted/50">
                <Link to={`/templates/${template.id}`} className="w-full">
                  <Button variant="secondary" className="w-full">
                    Use Template
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TemplatesPage;
