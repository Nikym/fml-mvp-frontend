import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: '0 150px',
    },
    fontFamily: '"Hammersmith One", sans-serif',
    src: 'url(\'https://fonts.googleapis.com/css2?family=Hammersmith+One&display=swap\')',
  },
  content: {
    maxWidth: 1200,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const { refreshToken } = useContext(userContext);

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <div className={classes.root}>
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
