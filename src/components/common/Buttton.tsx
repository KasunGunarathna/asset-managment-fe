import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <MuiButton variant="contained" color="primary" onClick={onClick}>{children}</MuiButton>;
};

export default Button;
