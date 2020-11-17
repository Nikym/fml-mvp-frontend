import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Login from '../login/Login';
import Register from '../register/Register';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    position: 'relative',
    width: 300,
    '& > h2': {
      margin: 0,
      marginBottom: 20,
    },
  },
  switch: {
    position: 'absolute',
    right: 20,
  },
}));

const AuthHandler = () => {
  const classes = useStyles();
  const [viewLogin, setViewLogin] = useState(true);

  const handleSwitch = () => {
    setViewLogin((prevState) => !prevState);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Button className={classes.switch} size="small" onClick={handleSwitch}>
        {viewLogin ? 'Register' : 'Login'}
      </Button>
      {viewLogin ? <Login /> : <Register />}
    </Paper>
  );
};

export default AuthHandler;
