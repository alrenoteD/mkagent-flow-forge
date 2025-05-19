
# Running MKagent Locally with Internet Access

This guide will help you set up MKagent on your local machine and make it accessible via the internet.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A free [Ngrok](https://ngrok.com/) account (for internet exposure)

## Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mkagent.git
   cd mkagent
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application should now be running at `http://localhost:5173` (or another port if 5173 is already in use).

## Make it Accessible via the Internet

### Option 1: Using Ngrok (Recommended for Development)

Ngrok allows you to expose your local server to the internet with a public URL.

1. **Install Ngrok**

   Follow the installation instructions at [ngrok.com/download](https://ngrok.com/download)

2. **Create a free Ngrok account and get your auth token**

   Sign up at [ngrok.com](https://ngrok.com/) and get your auth token from the dashboard.

3. **Configure Ngrok with your auth token**

   ```bash
   ngrok authtoken YOUR_AUTH_TOKEN
   ```

4. **Expose your local server**

   ```bash
   ngrok http 5173
   ```

   Ngrok will display a public URL (e.g., `https://abc123.ngrok.io`) that you can use to access your local server from anywhere.

### Option 2: Using Replit

Replit provides a free and easy way to deploy your application online.

1. **Create a Replit account**

   Sign up at [replit.com](https://replit.com/)

2. **Create a new Repl**

   - Click on "Create Repl"
   - Select the language (e.g., "Node.js")
   - Give your Repl a name (e.g., "mkagent")

3. **Upload your code**

   You can either:
   - Upload a ZIP file of your project
   - Connect with GitHub and import your repository
   - Manually upload each file

4. **Configure the run command**

   In the `.replit` file or run configuration, set:

   ```
   run = "npm run dev"
   ```

5. **Run your Repl**

   Click the "Run" button. Replit will provide a URL where your application is accessible.

### Option 3: Using Railway

Railway offers a more robust deployment option with a generous free tier.

1. **Create a Railway account**

   Sign up at [railway.app](https://railway.app/)

2. **Install the Railway CLI**

   ```bash
   npm i -g @railway/cli
   ```

3. **Login to Railway**

   ```bash
   railway login
   ```

4. **Initialize a new project**

   ```bash
   railway init
   ```

5. **Deploy your application**

   ```bash
   railway up
   ```

6. **Configure environment variables**

   Set any necessary environment variables through the Railway dashboard.

## Configuring Webhooks for WhatsApp Integration

For WhatsApp integrations to work properly, you need to configure your webhook URL in the appropriate service:

1. **In MKagent Settings**

   - Go to Settings > Server Settings
   - Set your Server URL to your public URL (e.g., `https://abc123.ngrok.io`)

2. **In your WhatsApp Provider Dashboard**

   - Twilio: Set webhook URL to `https://your-public-url/api/twilio/webhook`
   - Z-API: Set webhook URL to `https://your-public-url/api/zapi/webhook`
   - Meta API: Set webhook URL to `https://your-public-url/api/meta/webhook`
   - 360Dialog: Set webhook URL to `https://your-public-url/api/360dialog/webhook`
   - UltraMsg: Set webhook URL to `https://your-public-url/api/ultramsg/webhook`

## Security Considerations

When exposing your local server to the internet, consider the following:

1. **API Keys**: Keep your API keys secure. Don't commit them to public repositories.
   
2. **Access Control**: Consider implementing password protection or other authentication methods.
   
3. **Limited Exposure**: Only expose your server when needed, and close the connection when done.

## Troubleshooting

- **WhatsApp messages not coming through**: Verify that your webhook URL is correctly configured and accessible.

- **"Connection refused" errors**: Ensure your local server is running and the port matches what you've configured in Ngrok or other tools.

- **API rate limiting**: Most API providers have rate limits. Check their documentation if you encounter issues.

## Additional Resources

- [Ngrok Documentation](https://ngrok.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Replit Documentation](https://docs.replit.com/)

For more help, please visit our [GitHub issue page](https://github.com/yourusername/mkagent/issues) or the project's community forum.
