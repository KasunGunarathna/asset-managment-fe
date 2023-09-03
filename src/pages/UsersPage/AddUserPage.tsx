import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth, setLoginUser } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { fetchUsers,  selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";

const AddUsersPage = () => {
  const nic = sessionStorage.getItem("userNic");

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

 

  return (
    <>
      <MainTemplate
        userDetails={auth.loginUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Users", "Add User"]}
      ></MainTemplate>
    </>
  );
};

export default AddUsersPage;
