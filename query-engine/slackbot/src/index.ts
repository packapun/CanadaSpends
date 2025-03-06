import { App, SlackEventMiddlewareArgs, SayFn } from '@slack/bolt';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

// API configuration
const API_URL = process.env.API_URL || 'http://api:8000';

// Initialize Slack app with the ExpressReceiver
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: false,
  // Pass custom receiver to handle both Express and Bolt in one place
  customRoutes: [
    {
      path: '/health',
      method: ['GET'],
      handler: (req, res) => {
        res.status(200).send('OK');
      },
    },
  ],
});

// Handle app_mention events with the Bolt API
slackApp.event('app_mention', async ({ event, say }) => {
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
    await say({
      text: formatResponse(response.data),
      thread_ts: event.ts
    });
  } catch (error) {
    console.error('Error processing mention:', error);
    await say({
      text: "Sorry, I encountered an error processing your request.",
      thread_ts: event.ts
    });
  }
});

// Add this function before the app.listen section
function formatResponse(data: any): string {
  // Create a nicely formatted message with all the response data
  let message = '';
  
  if (data.answer) {
    message += `*Answer:*\n${data.answer}\n\n`;
  }
  
  if (data.summary) {
    message += `*Summary:*\n${data.summary}\n\n`;
  }
  
  if (data.sql_query) {
    message += `*SQL Query:*\n\`\`\`${data.sql_query}\`\`\`\n\n`;
  }
  
  if (data.related_questions && Array.isArray(data.related_questions) && data.related_questions.length > 0) {
    message += `*Related Questions:*\n`;
    data.related_questions.forEach((question: string, index: number) => {
      message += `${index + 1}. ${question}\n`;
    });
  }
  
  // If we couldn't format anything, return the raw data
  if (!message) {
    message = `\`\`\`${JSON.stringify(data, null, 2)}\`\`\``;
  }
  
  return message;
}

// Start the app
(async () => {
  const port = Number(process.env.PORT) || 3000;
  
  await slackApp.start(port);
  console.log(`⚡️ Slackbot is running on port ${port}!`);
})(); 