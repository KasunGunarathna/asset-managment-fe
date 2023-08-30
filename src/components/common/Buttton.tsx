import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  type: "button" | "submit" | "reset"; // Add this line for the type prop
  children: React.ReactNode;
  className?: string; // Allow className to be passed as a prop
  loading?: boolean; // Allow loading to be passed as a prop
}

const Button: React.FC<ButtonProps> = ({ onClick, type, children, className, loading }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      onClick={onClick}
      type={type} // Use the type prop here
      className={className}
      disabled={loading} // Disable the button if loading is true
    >
      {children}
    </MuiButton>
  );
};

export default Button;
