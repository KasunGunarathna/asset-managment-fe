import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button, Box, Typography } from "@mui/material";

interface LocationViewModalProps {
  open: any;
  latitude: number;
  longitude: number;
}

const LocationViewModal: React.FC<LocationViewModalProps> = ({
  open,
  latitude,
  longitude,
}) => {
  const onClose = () => {
    return false;
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5">Location Details</Typography>
        <div style={{ height: "300px", width: "100%" }}>
          <iframe
            title="Google Maps Location"
            width="100%"
            height="100%"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAep7x3qwBqLAdM5Mnx7dVQLK9BsHEFu_0&q=${latitude},${longitude}`}
          ></iframe>
        </div>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default LocationViewModal;
