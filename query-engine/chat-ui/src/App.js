import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messageListRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial greeting and database summary prompt
  useEffect(() => {
    // Add initial greeting
    const initialGreeting = {
      text: "This search portal can provide answers on Canadian federal governement spending, through the transfer payments databse.",
      sender: 'bot'
    };
    
    setMessages([initialGreeting]);
    
    // Self-prompt for database summary after a short delay
    const timer = setTimeout(() => {
      handleDatabaseSummaryPrompt();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDatabaseSummaryPrompt = async () => {
    setLoading(true);
    
    // Add the self-prompt message
    const summaryPrompt = {
      text: "Summarizing the database and what kind of information is available to query...",
      sender: 'system-prompt'
    };
    
    setMessages(prev => [...prev, summaryPrompt]);
    
    try {
      // Call API endpoint with the summary question
      const response = await axios.post('/api/sql/query', {
        question: "Summarize the database schema and what kind of information is available",
        source: "auto-prompt"
      });
      
      // Add response to chat
      setMessages(prev => [...prev, {
        text: response.data.answer,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error('Error querying API:', error);
      setMessages(prev => [...prev, {
        text: "This database contains information about Canadian government spending, including contracts, grants, and other expenditures. You can ask questions about specific departments, spending amounts, time periods, and contractors.",
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Call API endpoint
      const response = await axios.post('/api/sql/query', {
        question: input,
        source: "web"
      });
      
      // Add response to chat
      setMessages(prev => [...prev, {
        text: response.data.answer || "Sorry, I couldn't process that request.",
        sender: 'bot'
      }]);
    } catch (error) {
      console.error('Error querying API:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error processing your request.",
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo">🇨🇦</div>
          <div className="title-container">
            <h1>Canadian Federal Transfer Payments Explorer</h1>
            <div className="subtitle">Explore Canadian Government Spending Data</div>
          </div>
        </div>
      </header>
      <div className="chat-container">
        <div className="message-list" ref={messageListRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.sender === 'system-prompt' ? (
                <div className="system-prompt-label">System asked:</div>
              ) : null}
              {message.text}
            </div>
          ))}
          {loading && (
            <div className="message bot loading">
              <div className="loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>
        <form className="input-form" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Canadian government spending..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App; 