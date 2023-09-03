import React from "react";
import { Box, Link, Typography } from "@mui/material";

const Copyright: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: "#f5f5f5",
        p: "2px",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
