import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
import { userContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  button: {
    backgroundColor: 'rgb(0,25,168)',
    '&:hover': {
      backgroundColor: 'rgb(20,45,188)',
    },
    color: 'WhiteSmoke',
  },
}));

const Logout = () => {
  const classes = useStyles();
  const { userDispatch } = useContext(userContext);

  const handleLogout = () => {
    axios.get('http://172.55.1.2:8000/auth/logout', {
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
    <Box className={classes.root}>
      <IconButton
        className={classes.button}
        size="large"
        onClick={handleLogout}
      >
        <ExitToAppIcon />
      </IconButton>
    </Box>
  );
};

export default Logout;
