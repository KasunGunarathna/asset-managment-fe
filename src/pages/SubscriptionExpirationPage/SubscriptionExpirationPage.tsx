// SubscriptionExpirationPage.tsx

import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

interface SubscriptionExpirationPageProps {
  onRenewSubscription: (code: string) => void;
}

const SubscriptionExpirationPage: React.FC<SubscriptionExpirationPageProps> = ({
  onRenewSubscription,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [renewalCode, setRenewalCode] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRenewWithCode = () => {
    onRenewSubscription(renewalCode);
    handleCloseDialog();
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Subscription Expired
        </Typography>
        <Typography variant="body1" paragraph>
          Your subscription has expired. Please renew your subscription to
          continue using our service.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
        >
          Renew Subscription
        </Button>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Renew Subscription</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="renewalCode"
            label="Renewal Code"
            type="text"
            fullWidth
            value={renewalCode}
            onChange={(e) => setRenewalCode(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRenewWithCode} color="primary">
            Renew
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubscriptionExpirationPage;
