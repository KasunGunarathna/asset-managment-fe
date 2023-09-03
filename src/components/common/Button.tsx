import React from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  onClick: () => void;
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  children,
  className,
  loading,
}) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      onClick={onClick}
      type={type}
      className={className}
      disabled={loading}
      sx={{ marginY: 1, paddingX: 3, paddingY: 1 }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
