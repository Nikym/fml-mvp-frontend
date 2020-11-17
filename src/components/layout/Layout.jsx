import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../../context/UserContext';
import AuthHandler from '../authHandler/AuthHandler';
import Logout from '../logout/Logout';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      padding: '0 150px',
    },
    fontFamily: '"Hammersmith One", sans-serif',
    src: 'url(\'https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap\')',
  },
  content: {
    maxWidth: 1200,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 25,
    width: '100%',
    maxWidth: 1200,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },
  title: {
    margin: 0,
    fontSize: 30,
    [theme.breakpoints.up('sm')]: {
      fontSize: 45,
    },
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const { refreshToken, currentUser } = useContext(userContext);
  const isLoggedIn = !!currentUser.token;

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <h1 className={classes.title}>Find My Lines</h1>
        {isLoggedIn && <Logout />}
      </div>

      {!isLoggedIn && <AuthHandler />}
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
