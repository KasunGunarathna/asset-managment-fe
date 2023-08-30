import React from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route  path="/" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
