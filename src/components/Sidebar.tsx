// Sidebar.tsx
import React from "react";
import {
  Drawer,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Menu,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Logo from "../assets/logo.png";
import MenuList from "./MenuList";
import NavigationList from "./MenuList";

interface SidebarProps {
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        backgroundColor: '#1776d6',
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ backgroundColor: '#1776d6' }}>
        <Avatar alt="Small Logo" src={Logo} sx={{ width: 40, height: 40, marginRight: 2 }} />
        <Typography component="div" sx={{ flexGrow: 1, color: 'white' }}>
          Kaduwela Municipal Council
        </Typography>
      </Toolbar>
      <NavigationList/>
    </Drawer>
  );
};

export default Sidebar;
