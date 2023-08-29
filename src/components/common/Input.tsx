import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {
  return <TextField type={type} label={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />;
};

export default Input;
