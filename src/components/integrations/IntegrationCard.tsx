
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function IntegrationCard({
  title,
  description,
  icon,
  isConnected,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            {isConnected ? (
              <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge>
            ) : (
              <Badge variant="outline">Not Connected</Badge>
            )}
          </div>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
        <div className="flex justify-center items-center h-12 w-12 rounded-md bg-muted">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <Button variant="destructive" onClick={onDisconnect}>
            Disconnect
          </Button>
        ) : (
          <Button onClick={onConnect}>Connect</Button>
        )}
      </CardContent>
    </Card>
  );
}
