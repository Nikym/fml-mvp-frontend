import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';

const useStyles = makeStyles(() => ({
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout>
      Hello world
    </Layout>
  );
};

export default HomePage;
