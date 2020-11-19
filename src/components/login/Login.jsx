import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    width: 300,
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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userDispatch } = useContext(userContext);
  const [msg, setMsg] = useState({ msg: undefined, color: undefined });
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleLogin = () => {
    setLoading(true);
    axios.post(`http://${process.env.URL || '10.1.0.215'}:8000/auth/login`,
      {
        username,
        password,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          userDispatch({
            type: 'SET_USER',
            payload: {
              username: res.data.username,
              token: res.data.token,
            },
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          setMsg({
            msg: err.response.data.error,
            color: 'red',
          });
        } else {
          setMsg({
            msg: 'Oops, something went wrong',
            color: 'red',
          });
        }
        setLoading(false);
      });
  };

  return (
    <>
      <h2>Login</h2>
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
          type="password"
          onChange={handlePasswordChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          onClick={handleLogin}
          disabled={loading}
          fullWidth
        >
          {loading ? '...' : 'Login'}
        </Button>
      </Box>
      {
        msg.msg
        && (
        <small className={classes.error} style={{ color: msg.color }}>
          {msg.msg}
        </small>
        )
      }
    </>
  );
};

export default Login;
