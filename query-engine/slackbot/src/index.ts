import { App, ExpressReceiver } from '@slack/bolt';
import axios from 'axios';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

dotenv.config();

// Log environment variables (redacted for security)
console.log('Environment check:');
console.log('SLACK_BOT_TOKEN exists:', !!process.env.SLACK_BOT_TOKEN);
console.log('SLACK_SIGNING_SECRET exists:', !!process.env.SLACK_SIGNING_SECRET);
console.log('API_URL:', process.env.API_URL || 'http://api:8000');

// API configuration
const API_URL = process.env.API_URL || 'http://api:8000';

// Track processed events to prevent duplicates
const processedEvents = new Set<string>();

// Initialize an Express receiver for Slack
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
  processBeforeResponse: true,
});

// Add health check endpoint
receiver.router.get('/health', (req, res) => {
  console.log('Health check endpoint hit');
  res.status(200).send('OK');
});

// Add a test endpoint
receiver.router.post('/test-event', (req, res) => {
  console.log('Test event received:', req.body);
  res.status(200).send('Event received');
});

// Add specific logging for the Slack events endpoint
receiver.router.use('/slack/events', (req, res, next) => {
  console.log('⚠️ Slack events endpoint hit:', req.method, req.body);
  next();
});

// Log all incoming requests to the receiver (keep this too)
receiver.router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body ? 'Has body' : 'No body');
  next();
});

// Initialize Slack app with the ExpressReceiver
const slackApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver,
  socketMode: false,
});

// Log when the app is ready to process events
slackApp.client.auth.test()
  .then(result => console.log('Bot connected as:', result.bot_id))
  .catch(error => console.error('Auth test failed:', error));

// Add logging for all Slack events
slackApp.use(async ({ logger, next }) => {
  logger.info('Received a Slack event');
  await next();
});

// Handle app_mention events with the Bolt API
slackApp.event('app_mention', async ({ event, say }) => {
  console.log('Received app_mention event:', event);
  // Create a unique event ID
  const eventId = `${event.ts}-${event.event_ts || Date.now()}`;
  
  // Skip if we've already processed this event
  if (processedEvents.has(eventId)) {
    console.log(`Skipping duplicate event: ${eventId}`);
    return;
  }
  
  // Track that we're processing this event
  processedEvents.add(eventId);
  
  // Clean up old events (keep last 1000)
  if (processedEvents.size > 1000) {
    const toRemove = Array.from(processedEvents).slice(0, processedEvents.size - 1000);
    toRemove.forEach(id => processedEvents.delete(id));
  }
  
  try {
    // Remove the bot mention from the text
    const text = event.text.replace(/<@[^>]+>/, '').trim();
    
    console.log(`Processing event ${eventId}: "${text}"`);
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
    console.error(`Error processing event ${eventId}:`, error);
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
  console.log(`Slack events URL: http://localhost:${port}/slack/events`);
  console.log(`Test endpoint: http://localhost:${port}/test-event`);
})(); 