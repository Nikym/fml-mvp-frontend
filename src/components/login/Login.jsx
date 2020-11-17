import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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

const Login = () => {
  const classes = useStyles();

  return (ß
    <Paper elevation={3} className={classes.root}>
      <h2>Login</h2>
      <Box className={classes.inputs} mb={2}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box className={classes.inputs} mb={2}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
