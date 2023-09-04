import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarProps {
  open: boolean;
  message: string;
  error: string |null;
  onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  onClose,
  error,
}) => {
  return (
    <>
      {error ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
          <Alert severity="error" onClose={onClose}>
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
          <Alert severity="success" onClose={onClose}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CustomSnackbar;
