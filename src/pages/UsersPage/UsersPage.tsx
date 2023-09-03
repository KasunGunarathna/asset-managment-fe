import  { useEffect } from "react";
import { fetchUserDetails, fetchUsers } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";
import {
  selectUser,
  setSearchQuery,
  setUserDetails,
  setUsers,
} from "../../store/userSlice";

const UsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchUserDetails(nic)
      .then((data) => {
        dispatch(setUserDetails(data));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  });

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        dispatch(setUsers(data));
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  });

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
      <MainTemplate userDetails={user.userDetails} handleLogout={handleLogout}>
        <TableControls
          searchQuery={user.searchQuery}
          setSearchQuery={setSearchQuery}
          onChange={nextPage}
        />
        <ReusableTable columns={columns} data={user.usersDetails} />
      </MainTemplate>
    </>
  );
};

export default UsersPage;
