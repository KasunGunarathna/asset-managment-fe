import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import ReusableTable from "../../components/common/Table";
import TableControls from "../../components/common/TableControls";
import MainTemplate from "../../templates/MainTemplate";
import {
  fetchUsers,
  selectUser,
} from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { setSearchQuery } from "../../store/searchSlice";
import PageLoader from "../../components/common/PageLoader";

const UsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

  const columns = [
    { id: "name", label: "Name" },
    { id: "user_type", label: "User Type" },
    { id: "nic", label: "NIC" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic))
    dispatch(fetchUsers());
  }, [nic,dispatch]);



  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  const nextPage = () => {
    navigate("/users/add");
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <PageLoader isLoading={loading}/>
      <MainTemplate
        userDetails={auth.loginUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users"]}
      >
        <TableControls
          searchQuery={""}
          setSearchQuery={setSearchQuery}
          onChange={nextPage}
        />
        <ReusableTable columns={columns} data={users} />
      </MainTemplate>
    </>
  );
};

export default UsersPage;
