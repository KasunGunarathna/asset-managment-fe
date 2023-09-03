import React from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Buttton";
import { useLogin } from "../../api/api"; // Import your API functions
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

// Import your logo image
import logoImage from '../../assets/logo.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [nic, setNic] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, loading, error } = useLogin(); 
  const handleLogin = async () => {
    try {
      await login({ nic, password });
      navigate('/home');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <h2>Asset Management System</h2>
        <h3>Kaduwela Municipal Council</h3>
        <h4>Sri Lanka</h4>
        
        <Input
          type="text"
          placeholder="NIC"
          value={nic}
          onChange={(value) => setNic(value)}
          className="input-field"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          className="input-field"
        />
        <Button
          type="button"
          onClick={handleLogin}
          className="login-button"
          loading={loading}
        >
          Login
        </Button>
        {error && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
