import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import ChatPage from './components/Chat/ChatPage';
import './App.css';


const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const handleLogin = (userName: string) => {
    setUserName(userName);
  };

  return (
    <div className="App">
      {!userName ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <ChatPage userName={userName} />
      )}
    </div>
  );
};

export default App;
