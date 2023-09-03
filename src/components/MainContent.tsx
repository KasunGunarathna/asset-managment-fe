// MainContent.tsx
import React from "react";
import { Box, Toolbar } from "@mui/material";

interface MainContentProps {}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 2 }}>
      <Toolbar />
      {children}
    </Box>
  );
};

export default MainContent;
