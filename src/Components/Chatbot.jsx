import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { AiOutlineMessage } from 'react-icons/ai'; // Importing an icon from react-icons

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat visibility

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        message: userInput,
      });

      if (response.data && response.data.answer) {
        const botMessage = { sender: 'bot', text: response.data.answer };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        
      } else {
        const botMessage = { sender: 'bot', text: 'No response from server' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
      const botMessage = { sender: 'bot', text: 'Server Error. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    setUserInput('');
  };

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chatbot Icon */}
      <div className={styles.chatbotIcon} onClick={toggleChat}>
        <AiOutlineMessage size={30} />
      </div>

      {/* Chatbot Popup */}
      {isChatOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <h3>DataBot</h3>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === 'bot' ? styles.bot : styles.user
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className={styles.inputField}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default ChatBot;
