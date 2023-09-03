import { useEffect, useState } from "react";
import { fetchUserDetails } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import { setTokenExpiration } from "../../utils/tokenExpiration";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainContent from "../../components/MainContent";
const drawerWidth = 240;

const HomePage = () => {
  const dispatch = useDispatch();
  const nic = sessionStorage.getItem("userNic");
  const [userDetails, setUserDetails] = useState<any>(null);
  const auth = useSelector(selectAuth);
  const handleLogout = () => {
    // Dispatch the logout action
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
    console.log(auth.tokenExpiry);
    if (auth.token && auth.tokenExpiry) {
      setTokenExpiration(auth.tokenExpiry, dispatch);
    }
  }, [auth.token, auth.tokenExpiry, dispatch]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header userDetails={userDetails} onLogout={handleLogout} />
        <Sidebar drawerWidth={drawerWidth} />
        <MainContent>
          <h1>Welcome to the Home Page</h1>
          {<p>You are authenticated!</p>}
        </MainContent>
      </Box>
    </>
  );
};

export default HomePage;
