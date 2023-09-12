import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { Link } from "react-router-dom";
import LightIcon from '@mui/icons-material/Light';
import AirIcon from '@mui/icons-material/Air';

const itemsWithIcons = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Users", icon: <PersonIcon />, path: "/users" },
  { text: "Bridge and Culverts", icon: <AlignVerticalTopIcon />, path: "/bridges" },
  { text: "Roads", icon: <AltRouteIcon />, path: "/roads" },
  { text: "Street Lights", icon: <LightIcon />, path: "/street_lights" },
  { text: "Drainages", icon: <AirIcon />, path: "/drainages" },
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
