// Header.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "./common/Buttton";

interface HeaderProps {
  userDetails: any;
  onLogout: () => void;
}

const drawerWidth = 240;

const Header: React.FC<HeaderProps> = ({ userDetails, onLogout }) => {
  return (
    <AppBar position="fixed"  sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` ,backgroundColor:'#1776d6'}}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Asset Management System
        </Typography>
        <Typography component="div" sx={{ marginRight: 2 }}>
          {userDetails && userDetails.name}
        </Typography>
        <Button type="button" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
