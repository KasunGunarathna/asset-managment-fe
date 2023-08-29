import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from './store/authSlice';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const auth = useSelector(selectAuth);

  return (
    <div>
      {auth.isAuthenticated ? (
        <h2>Welcome! You are logged in.</h2>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default App;
