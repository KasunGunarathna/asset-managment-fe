import React, { useEffect, useState } from "react";
import { fetchUserDetails, fetchUsers } from "../../api/api";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/authSlice";
import { Box, Container, Paper } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
import ReusableTable from "../../components/common/Table";
import Copyright from "../../components/Copyright";
import BreadcrumbTrail from "../../components/BreadcrumbTrail";
import TableControls from "../../components/common/TableControls";

const drawerWidth = 240;

const UsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState<any>(null);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // useEffect(() => {
  //   // Filter the users based on the searchQuery
  //   const filteredData = users.filter((user) =>
  //     Object.values(user).some(
  //       (value) =>
  //         value &&
  //         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  //   setFilteredUsers(filteredData);
  // }, [searchQuery, users]);

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const nextPage = () => {
    console.log("next page");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header userDetails={userDetails} onLogout={handleLogout} />
        <Sidebar drawerWidth={drawerWidth} />
        <Container sx={{ flexGrow: 1, paddingTop: "16px" }}>
          <MainContent>
            <Paper elevation={3} sx={{ padding: "10px" }}>
              <BreadcrumbTrail items={["Home", "Users"]} />
              <TableControls
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onChange={nextPage}
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
