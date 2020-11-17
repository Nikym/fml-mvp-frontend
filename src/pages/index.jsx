import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    textAlign: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        test
      </div>
    </Layout>
  );
};

export default HomePage;
