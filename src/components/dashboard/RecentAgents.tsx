
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  lastRun: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Customer Support Assistant",
    description: "Handles basic customer inquiries via WhatsApp",
    status: "active",
    lastRun: "10 minutes ago"
  },
  {
    id: "2",
    name: "Appointment Scheduler",
    description: "Books appointments and sends reminders",
    status: "active",
    lastRun: "3 hours ago"
  },
  {
    id: "3",
    name: "Product Catalog Browser",
    description: "Helps users browse products and check availability",
    status: "draft",
    lastRun: "Never"
  }
];

export function RecentAgents() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Agents</CardTitle>
        <CardDescription>
          Your recently created or modified agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{agent.name}</h3>
                  <Badge variant={agent.status === "active" ? "default" : agent.status === "draft" ? "outline" : "secondary"}>
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                Last run: {agent.lastRun}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
