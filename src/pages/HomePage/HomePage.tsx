import { useEffect } from "react";
import { fetchUserDetails } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, selectAuth } from "../../store/authSlice";
import { setTokenExpiration } from "../../utils/tokenExpiration";
import MainTemplate from "../../templates/MainTemplate";
import { selectUser, setUserDetails } from "../../store/userSlice";

const HomePage = () => {
  const nic = sessionStorage.getItem("userNic");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const auth = useSelector(selectAuth);

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(clearToken());
    localStorage.removeItem("isAuthenticated");
  };
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
    if (auth.token && auth.tokenExpiry) {
      setTokenExpiration(auth.tokenExpiry, dispatch);
    }
  }, [auth.token, auth.tokenExpiry, dispatch]);

  return (
    <>
      <MainTemplate
        userDetails={user.userDetails}
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
