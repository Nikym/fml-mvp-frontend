import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../../context/UserContext';
import Register from '../register/Register';
import Logout from '../logout/Logout';
import Login from '../login/Login';

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
  title: {
    fontSize: 55,
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
      <h1 className={classes.title}>Find My Lines</h1>
      {isLoggedIn
        ? <Logout />
        : (
          <>
            <h1>Welcome!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed sagittis porta nisl eu dapibus. Etiam elit felis, ultricies ut lacinia molestie,
              placerat eu ligula. In consequat nibh ex, sed laoreet lorem elementum eget.
              Suspendisse faucibus metus in lobortis hendrerit. Morbi sagittis sapien quis
              nisi aliquam, at volutpat lacus venenatis. Nam eleifend lacus sed nisl faucibus
              iaculis. Duis porttitor finibus massa, id suscipit ante gravida at.
            </p>
            <Login />
          </>
        )}
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
