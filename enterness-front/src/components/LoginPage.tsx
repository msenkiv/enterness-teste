import React, { useState } from 'react';
import './LoginPage.css';

interface Props {
  onLogin: (userName: string) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    if (userName.trim()) {
      localStorage.setItem('userName', userName); 
      onLogin(userName);
    }
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Input your name:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default LoginPage;
