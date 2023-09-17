import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, fetchLoginUser, selectAuth } from "../../store/authSlice";
import MainTemplate from "../../templates/MainTemplate";
import { AppDispatch } from "../../store/store";

const HomePage = () => {
  const nic = sessionStorage.getItem("userNic");

  const dispatch = useDispatch<AppDispatch>();
  const { logUser } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchLoginUser(nic));
  }, [nic, dispatch]);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <>
      <MainTemplate
        userDetails={logUser}
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
