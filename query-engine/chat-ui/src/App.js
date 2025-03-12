import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messageListRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Create a session and show initial greeting
  useEffect(() => {
    // Create a new session on first load
    createNewSession().then(sessionId => {
      // Add initial greeting after session is created
      const initialGreeting = {
        text: "This search portal can provide answers on Canadian federal government spending, through the transfer payments database.",
        sender: 'bot'
      };
      
      setMessages([initialGreeting]);
      
      // Self-prompt for database summary after a short delay
      const timer = setTimeout(() => {
        handleDatabaseSummaryPrompt();
      }, 1000);
      
      return () => clearTimeout(timer);
    });
  }, []);

  // Create a new session
  const createNewSession = async () => {
    try {
      const response = await axios.post('/api/sessions');
      const newSessionId = response.data.session_id;
      setSessionId(newSessionId);
      console.log(`New session created: ${newSessionId}`);
      return newSessionId;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  const handleDatabaseSummaryPrompt = async () => {
    setLoading(true);
    
    // Add the self-prompt message
    const summaryPrompt = {
      text: "Summarizing the database and what kind of information is available to query...",
      sender: 'system-prompt'
    };
    
    setMessages(prev => [...prev, summaryPrompt]);
    
    try {
      // Call API endpoint with the session ID
      const response = await axios.post('/api/sql/query', {
        question: "Summarize the database schema and what kind of information is available. Provide high level statistics on the data.",
        source: "auto-prompt",
        session_id: sessionId
      });
      
      // Add response to chat
      setMessages(prev => [...prev, {
        text: response.data.answer,
        sender: 'bot',
        relatedQuestions: response.data.related_questions || []
      }]);
    } catch (error) {
      console.error('Error querying API:', error);
      setMessages(prev => [...prev, {
        text: "This database contains information about Canadian government spending, including contracts, grants, and other expenditures. You can ask questions about specific departments, spending amounts, time periods, and contractors.",
        sender: 'bot',
        relatedQuestions: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const question = input;
    setInput(''); // Clear input field
    sendMessage(question, "web");
  };

  // Send message and handle API response
  const sendMessage = async (question, source = "web") => {
    // Add user message to chat
    const userMessage = { text: question, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      // Include session_id with every request
      const response = await axios.post('/api/sql/query', {
        question: question,
        source: source,
        session_id: sessionId
      });
      
      // If the response includes a session_id, update it
      if (response.data.session_id) {
        setSessionId(response.data.session_id);
      }
      
      // Add response to chat with related questions
      setMessages(prev => [...prev, {
        text: response.data.answer || "Sorry, I couldn't process that request.",
        sender: 'bot',
        relatedQuestions: response.data.related_questions || []
      }]);
    } catch (error) {
      console.error('Error querying API:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error processing your request.",
        sender: 'bot',
        relatedQuestions: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking a suggested question
  const handleSuggestedQuestionClick = (question) => {
    // Use the shared sendMessage function with a special source identifier
    sendMessage(question, "suggestion");
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
              
              {/* Display suggestion buttons for bot messages with related questions */}
              {message.sender === 'bot' && message.relatedQuestions && message.relatedQuestions.length > 0 && (
                <div className="suggested-questions">
                  <div className="suggestions-label">Suggested follow-up questions:</div>
                  <div className="suggestion-buttons">
                    {message.relatedQuestions.slice(0, 2).map((question, qIndex) => (
                      <button 
                        key={qIndex} 
                        className="suggestion-button"
                        onClick={() => handleSuggestedQuestionClick(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
        <form className="input-form" onSubmit={handleSubmit}>
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