import React from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Buttton";
import { useLogin } from "../api/api"; // Import your API functions

const LoginPage: React.FC = () => {
  const [nic, setNic] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, loading, error } = useLogin(); 
  const handleLogin = async () => {
    try {
      await login({ nic, password });
      // Redirect to dashboard or handle success
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Input type="text" placeholder="NIC" value={nic} onChange={setNic} />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
