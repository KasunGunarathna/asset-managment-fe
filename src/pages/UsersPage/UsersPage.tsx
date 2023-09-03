import React, { useEffect, useState } from "react";
import { fetchUserDetails, fetchUsers } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import { setTokenExpiration } from "../../utils/tokenExpiration";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../assets/logo.png";
import Button from "../../components/common/Buttton";
import HomeIcon from "@mui/icons-material/Home";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ReusableTable from "../../components/common/Table";
import Copyright from "../../components/Copyright";
import BreadcrumbTrail from "../../components/BreadcrumbTrail";
const drawerWidth = 240;

const UsersPage = () => {
  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];
  const dispatch = useDispatch();
  const nic = sessionStorage.getItem("userNic");
  const [userDetails, setUserDetails] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const auth = useSelector(selectAuth);
  const handleLogout = () => {
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
    fetchUsers()
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header userDetails={userDetails} onLogout={handleLogout} />
        <Sidebar drawerWidth={drawerWidth} />
        <Container sx={{ flexGrow: 1, paddingTop: "16px" }}>
          <MainContent>
            <Paper elevation={3} sx={{ padding: "10px" }}>
            <BreadcrumbTrail
                items={["Home","Users"]}
              />
              <ReusableTable columns={columns} data={users} />
            </Paper>
          </MainContent>
         
        </Container>
      </Box>
      <Copyright />
    </>
  );
};

export default UsersPage;
