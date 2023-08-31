import React, { useEffect, useState } from "react";
import { fetchUserDetails } from "../../api/api";
import { useDispatch } from 'react-redux';
import { clearToken } from "../../store/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const nic = sessionStorage.getItem("userNic");
  const [userDetails, setUserDetails] = useState<any>(null);
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(clearToken());
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

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>NIC: {userDetails.nic}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
