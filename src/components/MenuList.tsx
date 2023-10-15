import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { Link } from "react-router-dom";
import LightIcon from "@mui/icons-material/Light";
import AirIcon from "@mui/icons-material/Air";
import { CheckPermission } from "../utils/permissionConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchLoginUser } from "../services/authService";
import { selectAuth } from "../store/authSlice";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CarRentalIcon from '@mui/icons-material/CarRental';

const NavigationList: React.FC<{}> = () => {
  const nic = sessionStorage.getItem("userNic");
  const dispatch = useDispatch<AppDispatch>();
  const { logUser } = useSelector(selectAuth);
  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);
  const itemsWithIcons = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/home",
      permission: true,
    },
    {
      text: "Users",
      icon: <PersonIcon />,
      path: "/users",
      permission: CheckPermission(logUser?.user_type, "page"),
    },
    {
      text: "Bridge and Culverts",
      icon: <AlignVerticalTopIcon />,
      path: "/bridges",
      permission: true,
    },
    { text: "Roads", icon: <AltRouteIcon />, path: "/roads", permission: true },
    {
      text: "Street Lights",
      icon: <LightIcon />,
      path: "/street_lights",
      permission: true,
    },
    {
      text: "Drainages",
      icon: <AirIcon />,
      path: "/drainages",
      permission: true,
    },
    {
      text: "Buildings",
      icon: <ApartmentIcon />,
      path: "/buildings",
      permission: true,
    },
    {
      text: "Vehicles",
      icon: <CarRentalIcon />,
      path: "/vehicles",
      permission: true,
    },
  ];

  return (
    <List>
      {itemsWithIcons.map((item, index) =>
        item.permission ? (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ) : null,
      )}
    </List>
  );
};

export default NavigationList;
