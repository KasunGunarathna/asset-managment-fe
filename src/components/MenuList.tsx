import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Link } from "react-router-dom";

const itemsWithIcons = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Users", icon: <StarIcon /> , path: "/users"},
  { text: "Send email", icon: <EmailIcon /> , path: "/hello2"},
  { text: "Drafts", icon: <DraftsIcon /> , path: "/hello3"},
];

const NavigationList: React.FC<{}> = () => {
  return (
    <List>
      {itemsWithIcons.map((item, index) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationList;
