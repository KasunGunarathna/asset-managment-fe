import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth, setLoginUser } from "../../store/authSlice";
import { setTokenExpiration } from "../../utils/tokenExpiration";
import MainTemplate from "../../templates/MainTemplate";
import {  fetchUsers, selectUser } from "../../store/userSlice";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
    // Dispatch the logout action
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };
  
  useEffect(() => {
    if (auth.token && auth.tokenExpiry) {
      setTokenExpiration(auth.tokenExpiry, dispatch);
    }
  }, [auth.token, auth.tokenExpiry, dispatch]);

  return (
    <>
      <MainTemplate
        userDetails={auth.loginUser}
        handleLogout={handleLogout}
        breadCrumb={["Home", "Home"]}
      >
        <h1>Welcome to the Home Page</h1>
        {<p>You are authenticated!</p>}
      </MainTemplate>
    </>
  );
};

export default HomePage;
