import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import { setTokenExpiration } from "../../utils/tokenExpiration";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import Button from "../../components/common/Buttton";
import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;

const HomePage = () => {
  const dispatch = useDispatch();
  const nic = sessionStorage.getItem("userNic");
  const [userDetails, setUserDetails] = useState<any>(null);
  const auth = useSelector(selectAuth);
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };
  useEffect(() => {
    fetchUserDetails(nic)
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [nic]);

  useEffect(() => {
    console.log(auth.tokenExpiry);
    if (auth.token && auth.tokenExpiry) {
      setTokenExpiration(auth.tokenExpiry, dispatch);
    }
  }, [auth.token, auth.tokenExpiry, dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` ,backgroundColor:'#1776d6'}}
      >
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Asset Management System
          </Typography>
          <Typography component="div" sx={{ marginRight: 2 }}>
            {userDetails && userDetails.name}
          </Typography>
          <p></p>
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          backgroundColor:'#1776d6'
        }}
        variant="permanent"
        anchor="left"
        
      >
        <Toolbar sx={{backgroundColor:'#1776d6'}}>
          <Avatar
            alt="Small Logo"
            src={Logo}
            sx={{ width: 40, height: 40, marginRight: 2 }}
          />
          <Typography  component="div" sx={{ flexGrow: 1,color:'white' }}>
            Kaduwela Municipal Council
          </Typography>
        </Toolbar>
        {/* <Divider /> */}
        <List >
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Content container */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft:4 }}
      >
        <Toolbar />
        {/* Your home page content goes here */}
        <h1>Welcome to the Home Page</h1>
        {<p>You are authenticated!</p>}
      </Box>
    </Box>
  );
};

export default HomePage;
