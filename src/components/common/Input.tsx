import React from "react";
import { TextField } from "@mui/material";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <TextField
      type={type}
      label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      sx={{ marginY: 1 }}
    />
  );
};

export default Input;
