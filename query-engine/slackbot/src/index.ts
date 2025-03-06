import { App, SlackEventMiddlewareArgs, SayFn } from '@slack/bolt';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Slack app
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
});

// API configuration
const API_URL = process.env.API_URL || 'http://api:8000';

// Handle Slack's URL verification challenge and events
app.post('/slack/events', async (req, res) => {
  
  if (req.body.type === 'url_verification') {
    res.json({ challenge: req.body.challenge });
    return;
  }

  // Handle events
  if (req.body.type === 'event_callback') {
    const event = req.body.event;
    
    if (event.type === 'app_mention') {
      try {
        // Remove the bot mention from the text
        const text = event.text.replace(/<@[^>]+>/, '').trim();
        
        console.log('Sending query to API:', text);
        const response = await axios.post(`${API_URL}/sql/query`, {
          question: text,
          source: 'slack'
        });
        console.log('Received API response:', response.data.status);

        // Send response back to Slack
        await slackApp.client.chat.postMessage({
          channel: event.channel,
          text: response.data.response,
          thread_ts: event.ts
        });
      } catch (error) {
        console.error('Error processing mention:', error);
        await slackApp.client.chat.postMessage({
          channel: event.channel,
          text: "Sorry, I encountered an error processing your request.",
          thread_ts: event.ts
        });
      }
    }
  }
  
  res.sendStatus(200);
});

// Start the app
(async () => {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`⚡️ Slackbot is running on port ${port}!`);
  });
})(); 