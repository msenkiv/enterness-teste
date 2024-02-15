import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatPage.css';

const socket = io('http://localhost:3001');

interface Message {
  sender: string;
  content: string;
}

interface ChatPageProps {
  userName: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ userName }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim() !== '') {
      const messageData: Message = {
        sender: userName, 
        content: currentMessage,
      };
      socket.emit('sendMessage', messageData);
      setCurrentMessage('');
    }
  };

  return (
    <div className="chat-page">
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === userName ? 'sent' : 'received'}`}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="message-form">
        <input
          type="text"
          placeholder="Write a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
