export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('access_token'); // Replace with your actual key
    return token;
  };
  