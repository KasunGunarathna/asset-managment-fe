import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../../api/api';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/authSlice';

const HomePage = () => {
    const nic = sessionStorage.getItem('userNic'); 
  const [userDetails, setUserDetails] = useState<any>(null);
  useEffect(() => {
      fetchUserDetails(nic)
        .then((data) => {
          setUserDetails(data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
  },[nic]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {userDetails && (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>NIC: {userDetails.nic}</p>
          {/* ... other user details ... */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
