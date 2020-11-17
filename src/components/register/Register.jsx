import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    maxWidth: 300,
    '& > h2': {
      margin: 0,
      marginBottom: 20,
    },
  },
  inputs: {
    width: '100%',
  },
  button: {
    backgroundColor: 'rgb(0,25,168)',
    '&:hover': {
      backgroundColor: 'rgb(20,45,188)',
    },
    color: 'WhiteSmoke',
  },
}));

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const { currentUser } = useContext(userContext);

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleRepeatPasswordChange = (event) => {
    const { value } = event.target;
    setRepeatPass(value);
  };

  const handleRegister = () => {
    axios.post('http://localhost:8000/auth/register',
      {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('success registering');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <h2>Register</h2>
      <Box className={classes.inputs} mb={2}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
        />
      </Box>
      <Box className={classes.inputs} mb={2}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
      </Box>
      <Box className={classes.inputs} mb={2}>
        <TextField
          id="repeatPassword"
          label="Repeat password"
          variant="outlined"
          value={repeatPass}
          onChange={handleRepeatPasswordChange}
          fullWidth
        />
      </Box>
      <Box>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          onClick={handleRegister}
          fullWidth
        >
          Register
        </Button>
      </Box>
    </Paper>
  );
};

export default Register;
