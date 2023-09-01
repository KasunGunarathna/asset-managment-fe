import React from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Buttton";
import { useLogin } from "../../api/api"; // Import your API functions
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

// Import your logo image
import logoImage from '../../assets/logo.png';
import { Box, Container } from "@mui/material";

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
    <Container maxWidth="xs">
      <Box
        className="login-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box>
          <img src={logoImage} alt="Logo" className="logo-image" />
          <h2>Asset Management System</h2>
          <h3>Kaduwela Municipal Council</h3>
          <h4>Sri Lanka</h4>
        </Box>

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
      </Box>
    </Container>
  );
};

export default LoginPage;
