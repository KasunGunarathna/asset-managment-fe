import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const nextPage = () => {
    navigate("/users/add");
  };

  return (
    <>
      <MainTemplate
        userDetails={user.userDetails}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users"]}
      >
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
