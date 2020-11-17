import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

const Logout = () => {
  const { userDispatch } = useContext(userContext);

  const handleLogout = () => {
    axios.get('http://localhost:8000/auth/logout', {
      withCredentials: true,
    })
      .then(() => {
        userDispatch({
          type: 'REMOVE_USER',
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleLogout}
      fullWidth
    >
      Logout
    </Button>
  );
};

export default Logout;
