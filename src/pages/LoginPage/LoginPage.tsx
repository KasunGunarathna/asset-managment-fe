import React from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useLogin } from "../../api/authApis"; // Import your API functions
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

// Import your logo image
import logoImage from "../../assets/logo.png";
import { Box, Container, Paper, Typography } from "@mui/material";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [nic, setNic] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, loading, error } = useLogin();
  const handleLogin = async () => {
    try {
      await login({ nic, password });
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="xs"   sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
    }}>
    <Paper elevation={3} sx={{ p: 2, width: "100%", textAlign: "center" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
        mt={4}
        mx="auto" 
      >
        <img src={logoImage} alt="Logo" className="logo-image" />
        <Typography variant="h4">Asset Management System</Typography>
          <Typography variant="h6">Kaduwela Municipal Council</Typography>
          <Typography variant="subtitle1">Sri Lanka</Typography>

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
      </Paper>
    </Container>
  );
};

export default LoginPage;
