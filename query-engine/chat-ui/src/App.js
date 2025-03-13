import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import ChartDisplay from './components/ChartDisplay';
import './components/ChartDisplay.css';

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
    // Immediately add the welcome message without waiting for API
    const welcomeMessage = {
      text: "This search portal provides answers about Canadian federal government spending through the transfer payments database. Summarizing for you...",
      sender: 'bot'
    };
    
    setMessages([welcomeMessage]);
    
    // Then make API call to get the summary
    setLoading(true);
    
    // Call summarize endpoint
    axios.post('/api/summarize')
      .then(response => {
        if (response.data.status === "success") {
          // Save the session ID
          setSessionId(response.data.session_id);
          
          // Add the summary as a second message after a short delay
          setTimeout(() => {
            setMessages(prev => [...prev, {
              text: response.data.summary,
              sender: 'bot',
              relatedQuestions: response.data.related_questions || [],
              charts: response.data.charts || [] // Add charts to the message
            }]);
            setLoading(false);
          }, 1500); // 1.5 second delay for a more natural conversation pace
        } else {
          // Handle error
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error getting database summary:', error);
        setMessages(prev => [...prev, {
          text: "I'm having trouble summarizing the database at the moment. Feel free to ask about Canadian government spending data.",
          sender: 'bot'
        }]);
        setLoading(false);
      });
  }, []);

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
      
      // Add response to chat with related questions and charts
      setMessages(prev => [...prev, {
        text: response.data.answer || "Sorry, I couldn't process that request.",
        sender: 'bot',
        relatedQuestions: response.data.related_questions || [],
        charts: response.data.charts || [] // Add charts to the message
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
              
              {/* Display charts for bot messages with chart data */}
              {message.sender === 'bot' && message.charts && message.charts.length > 0 && (
                <ChartDisplay charts={message.charts} />
              )}
              
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