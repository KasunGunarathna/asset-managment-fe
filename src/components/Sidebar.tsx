// Sidebar.tsx
import React from "react";
import { Drawer, Avatar, Typography, Toolbar } from "@mui/material";
import Logo from "../assets/logo.png";
import NavigationList from "./MenuList";

const drawerWidth = 240;



const Sidebar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        backgroundColor: "#1776d6",
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ backgroundColor: "#1776d6" }}>
        <Avatar
          alt="Small Logo"
          src={Logo}
          sx={{ width: 40, height: 40, marginRight: 2 }}
        />
        <Typography component="div" sx={{ flexGrow: 1, color: "white" }}>
          Kaduwela Municipal Council
        </Typography>
      </Toolbar>
      <NavigationList />
    </Drawer>
  );
};

export default Sidebar;
