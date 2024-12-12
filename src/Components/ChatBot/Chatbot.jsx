import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { AiOutlineMessage } from 'react-icons/ai';

const suggestionsList = [
  "vin for car details",
  "dealer credentials",
  "origenate credentials",
  "tol rule",
  "odometer reading",
  "decision status",
  "lsecln value",
  "contract lender verification",
  "checklist item",
  "Formula for DTI",
  "Customer Details",
  "Provide list of customer test data"
];

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showVinPrompt, setShowVinPrompt] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Auto-scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send a message to the server and get a response
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setMessages([...messages, userMessage]);
    setFilteredSuggestions([]); // Clear suggestions after sending

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        message,
      });

      if (response.data && response.data.answer) {
        const responseArry = response.data.answer.split("\n\n")
        responseArry.forEach(element => {
          const botMessage = { sender: 'bot', text: [...element] };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        });
        // const botMessage = { sender: 'bot', text: [...responseArry] };
        // setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Check if the message contains "vin" and the response is not the default "unable to understand" message
        if (
          message.toLowerCase().includes('vin') &&
          response.data.answer !== 'Sorry, I am not able to understand the question.'
        ) {
          setShowVinPrompt(true);
        } else {
          setShowVinPrompt(false);
        }
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      const botMessage = { sender: 'bot', text: 'Server Error. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setShowVinPrompt(false);
    }
    setUserInput('');
  };

  // Handle Yes/No response for the VIN prompt
  const handleVinResponse = (response) => {
    const botMessage = { sender: 'bot', text: response };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setShowVinPrompt(false);
  };

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Handle suggestions filtering
  const handleInputChange = (value) => {
    setUserInput(value);

    // Show suggestions based on input
    if (value.length > 1) {
      const filtered = suggestionsList.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  // Clear chat function
  const handleClearChat = () => {
    setMessages([]); // Reset messages to clear the chat
  };

  return (
    <>
      <div className={styles.chatbotIcon} onClick={toggleChat}>
        <AiOutlineMessage size={30} />
      </div>

      {isChatOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <h3>DataBot</h3>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${msg.sender === 'bot' ? styles.bot : styles.user}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showVinPrompt && (
            <div className={styles.vinPrompt}>
              <p>Do you want to execute the script?</p>
              <button
                className={styles.yesButton}
                onClick={() => handleVinResponse('Your script is executing')}
              >
                Yes
              </button>
              <button
                className={styles.noButton}
                onClick={() => handleVinResponse('Thanks for your response')}
              >
                No
              </button>
            </div>
          )}

          {filteredSuggestions.length > 0 && (
            <div className={styles.suggestionsContainer}>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(userInput)}
            className={styles.inputField}
          />

          {/* Clear Button */}
          {messages.length > 0 && (
            <button className={styles.clearButton} onClick={handleClearChat}>
              Clear
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
