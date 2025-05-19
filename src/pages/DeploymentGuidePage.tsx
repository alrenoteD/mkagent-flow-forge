
import Layout from "@/components/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DeploymentGuidePage = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Deployment Guide</h1>
          <p className="text-muted-foreground mt-1">
            Learn how to deploy MKagent locally with internet access
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            MKagent is designed to run locally but requires internet access for WhatsApp integrations and LLM APIs.
          </AlertDescription>
        </Alert>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Prerequisites</CardTitle>
            <CardDescription>
              Make sure you have these tools installed before starting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js (v16 or later)</li>
              <li>npm or yarn</li>
              <li>Git (for cloning the repository)</li>
              <li>A free <a href="https://ngrok.com" className="text-primary underline" target="_blank" rel="noreferrer">Ngrok</a> account (for internet exposure)</li>
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="local">
          <TabsList className="mb-4">
            <TabsTrigger value="local">Local Setup</TabsTrigger>
            <TabsTrigger value="ngrok">Ngrok</TabsTrigger>
            <TabsTrigger value="replit">Replit</TabsTrigger>
            <TabsTrigger value="railway">Railway</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local">
            <Card>
              <CardHeader>
                <CardTitle>Local Setup</CardTitle>
                <CardDescription>
                  Running MKagent on your local machine
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Clone the repository</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      git clone https://github.com/yourusername/mkagent.git<br />
                      cd mkagent
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Install dependencies</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      npm install<br />
                      # or<br />
                      yarn
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Start the development server</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      npm run dev<br />
                      # or<br />
                      yarn dev
                    </code>
                  </pre>
                </div>

                <p>
                  The application should now be running at <code className="bg-muted px-1 py-0.5 rounded">http://localhost:5173</code> (or another port if 5173 is already in use).
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ngrok">
            <Card>
              <CardHeader>
                <CardTitle>Using Ngrok (Recommended for Development)</CardTitle>
                <CardDescription>
                  Expose your local server to the internet with a public URL
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Install Ngrok</h3>
                  <p>Follow the installation instructions at <a href="https://ngrok.com/download" className="text-primary underline" target="_blank" rel="noreferrer">ngrok.com/download</a></p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Create a free Ngrok account and get your auth token</h3>
                  <p>Sign up at <a href="https://ngrok.com" className="text-primary underline" target="_blank" rel="noreferrer">ngrok.com</a> and get your auth token from the dashboard.</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Configure Ngrok with your auth token</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      ngrok authtoken YOUR_AUTH_TOKEN
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">4. Expose your local server</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      ngrok http 5173
                    </code>
                  </pre>
                  <p className="mt-2">Ngrok will display a public URL (e.g., <code className="bg-muted px-1 py-0.5 rounded">https://abc123.ngrok.io</code>) that you can use to access your local server from anywhere.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="replit">
            <Card>
              <CardHeader>
                <CardTitle>Using Replit</CardTitle>
                <CardDescription>
                  Deploy MKagent using Replit's free hosting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Create a Replit account</h3>
                  <p>Sign up at <a href="https://replit.com" className="text-primary underline" target="_blank" rel="noreferrer">replit.com</a></p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Create a new Repl</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Click on "Create Repl"</li>
                    <li>Select the language (e.g., "Node.js")</li>
                    <li>Give your Repl a name (e.g., "mkagent")</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Upload your code</h3>
                  <p>You can either:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Upload a ZIP file of your project</li>
                    <li>Connect with GitHub and import your repository</li>
                    <li>Manually upload each file</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">4. Configure the run command</h3>
                  <p>In the <code className="bg-muted px-1 py-0.5 rounded">.replit</code> file or run configuration, set:</p>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      run = "npm run dev"
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">5. Run your Repl</h3>
                  <p>Click the "Run" button. Replit will provide a URL where your application is accessible.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="railway">
            <Card>
              <CardHeader>
                <CardTitle>Using Railway</CardTitle>
                <CardDescription>
                  Deploy MKagent using Railway's platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Create a Railway account</h3>
                  <p>Sign up at <a href="https://railway.app" className="text-primary underline" target="_blank" rel="noreferrer">railway.app</a></p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Install the Railway CLI</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      npm i -g @railway/cli
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Login to Railway</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      railway login
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">4. Initialize a new project</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      railway init
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">5. Deploy your application</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                    <code>
                      railway up
                    </code>
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">6. Configure environment variables</h3>
                  <p>Set any necessary environment variables through the Railway dashboard.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Configuring Webhooks for WhatsApp Integration</h2>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Webhook Setup</CardTitle>
              <CardDescription>
                For WhatsApp integrations to work properly, you need to configure your webhook URL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">1. In MKagent Settings</h3>
                <ul className="list-disc pl-6">
                  <li>Go to <Link to="/settings" className="text-primary underline">Settings</Link> &gt; Server Settings</li>
                  <li>Set your Server URL to your public URL (e.g., <code className="bg-muted px-1 py-0.5 rounded">https://abc123.ngrok.io</code>)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">2. In your WhatsApp Provider Dashboard</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Twilio:</strong> Set webhook URL to <code className="bg-muted px-1 py-0.5 rounded">https://your-public-url/api/twilio/webhook</code></li>
                  <li><strong>Z-API:</strong> Set webhook URL to <code className="bg-muted px-1 py-0.5 rounded">https://your-public-url/api/zapi/webhook</code></li>
                  <li><strong>Meta API:</strong> Set webhook URL to <code className="bg-muted px-1 py-0.5 rounded">https://your-public-url/api/meta/webhook</code></li>
                  <li><strong>360Dialog:</strong> Set webhook URL to <code className="bg-muted px-1 py-0.5 rounded">https://your-public-url/api/360dialog/webhook</code></li>
                  <li><strong>UltraMsg:</strong> Set webhook URL to <code className="bg-muted px-1 py-0.5 rounded">https://your-public-url/api/ultramsg/webhook</code></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Considerations</CardTitle>
              <CardDescription>
                Important security notes when exposing your local server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>API Keys:</strong> Keep your API keys secure. Don't commit them to public repositories.</li>
                <li><strong>Access Control:</strong> Consider implementing password protection or other authentication methods.</li>
                <li><strong>Limited Exposure:</strong> Only expose your server when needed, and close the connection when done.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DeploymentGuidePage;
