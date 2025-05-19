
import { useState } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlowCanvas from "@/components/flows/FlowCanvas";
import { SaveIcon, PlayIcon } from "@/components/icons/Icons";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from '@/components/ui/card';

const FlowEditor = () => {
  const [flowName, setFlowName] = useState('New Agent Flow');
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Flow Saved",
      description: `${flowName} has been saved successfully.`,
    });
  };

  const handleDeploy = () => {
    toast({
      title: "Flow Deployed",
      description: `${flowName} has been deployed and is now active.`,
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="animate-fade-in h-[calc(100vh-2rem)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Input
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="text-xl font-bold h-auto py-2 w-[300px] bg-transparent border-transparent focus-visible:bg-background"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleSave}>
              <SaveIcon className="h-4 w-4 mr-2" /> Save
            </Button>
            <Button onClick={handleDeploy}>
              <PlayIcon className="h-4 w-4 mr-2" /> Deploy
            </Button>
          </div>
        </div>

        <Tabs defaultValue="visual" className="h-[calc(100%-70px)]">
          <TabsList className="mb-4">
            <TabsTrigger value="visual">Visual Editor</TabsTrigger>
            <TabsTrigger value="code">Code View</TabsTrigger>
            <TabsTrigger value="test">Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="h-full">
            <FlowCanvas />
          </TabsContent>
          
          <TabsContent value="code" className="h-full">
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="code-editor h-full">
                  <pre className="text-xs font-mono p-4 h-full overflow-auto">
{`// Generated flow code for ${flowName}
{
  "name": "${flowName}",
  "version": "1.0.0",
  "nodes": [
    {
      "id": "start",
      "type": "message",
      "data": {
        "content": "Hello! How can I assist you today?"
      },
      "next": "user_input"
    },
    {
      "id": "user_input",
      "type": "input",
      "data": {
        "variable": "user_query",
        "content": "Please tell me what you'd like to do"
      },
      "next": "process_query"
    },
    {
      "id": "process_query",
      "type": "llm",
      "data": {
        "model": "gpt-3.5-turbo",
        "prompt": "The user has said: {{user_query}}. Determine their intent."
      },
      "next": "condition_check"
    },
    {
      "id": "condition_check",
      "type": "condition",
      "data": {
        "condition": "intent == 'booking'"
      },
      "next": {
        "true": "booking_flow",
        "false": "general_response"
      }
    },
    {
      "id": "booking_flow",
      "type": "message",
      "data": {
        "content": "I'll help you book an appointment."
      },
      "next": null
    },
    {
      "id": "general_response",
      "type": "message",
      "data": {
        "content": "Thank you for your query. I'll do my best to assist you."
      },
      "next": null
    }
  ]
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="test" className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <Card className="h-full overflow-hidden">
                <div className="bg-card p-4 border-b">
                  <h3 className="font-medium">Conversation Preview</h3>
                </div>
                <CardContent className="p-0">
                  <div className="flex flex-col h-[600px]">
                    <div className="flex-1 p-4 overflow-auto">
                      <div className="flex flex-col space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Hello! How can I assist you today?</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <div className="bg-primary rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm text-white">I need to book an appointment for tomorrow</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">I'll help you book an appointment. What time works best for you?</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <div className="flex space-x-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button>Send</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="h-full overflow-hidden">
                <div className="bg-card p-4 border-b">
                  <h3 className="font-medium">Debug Information</h3>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="jupyter-cell">
                      <div className="text-xs text-muted-foreground mb-1">Flow Execution - Step 1</div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`> Starting flow execution
> Node: start (message)
> Sending: "Hello! How can I assist you today?"
> Moving to node: user_input`}</pre>
                    </div>
                    
                    <div className="jupyter-cell">
                      <div className="text-xs text-muted-foreground mb-1">Flow Execution - Step 2</div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`> Node: user_input (input)
> Received input: "I need to book an appointment for tomorrow"
> Stored in variable: user_query
> Moving to node: process_query`}</pre>
                    </div>
                    
                    <div className="jupyter-cell">
                      <div className="text-xs text-muted-foreground mb-1">Flow Execution - Step 3</div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`> Node: process_query (llm)
> Model: gpt-3.5-turbo
> Input: "The user has said: I need to book an appointment for tomorrow. Determine their intent."
> LLM Output: {"intent": "booking", "details": {"day": "tomorrow", "type": "appointment"}}
> Moving to node: condition_check`}</pre>
                    </div>
                    
                    <div className="jupyter-cell">
                      <div className="text-xs text-muted-foreground mb-1">Flow Execution - Step 4</div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`> Node: condition_check (condition)
> Checking: intent == 'booking'
> Condition result: true
> Moving to branch: true (booking_flow)`}</pre>
                    </div>
                    
                    <div className="jupyter-cell">
                      <div className="text-xs text-muted-foreground mb-1">Flow Execution - Step 5</div>
                      <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
{`> Node: booking_flow (message)
> Sending: "I'll help you book an appointment."
> End of flow reached`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FlowEditor;
