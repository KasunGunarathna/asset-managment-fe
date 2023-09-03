import React, { useEffect, useState } from "react";
import { fetchUserDetails, fetchUsers } from "../../api/api";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";


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
      <MainTemplate userDetails={userDetails} handleLogout={handleLogout}>
        <TableControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onChange={nextPage}
        />
        <ReusableTable columns={columns} data={users} />
      </MainTemplate>
    </>
  );
};

export default UsersPage;
