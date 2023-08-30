export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('access_token');
    return token;
  };

  export const setTokenToLocalStorage = (token: string): void => {
    localStorage.setItem('access_token', token);
  };
  