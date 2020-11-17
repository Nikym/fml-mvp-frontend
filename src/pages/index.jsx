import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import { userContext } from '../context/UserContext';
import JourneysDisplay from '../components/journeysDisplay/JourneysDisplay';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
    textAlign: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const { currentUser: { token } } = useContext(userContext);

  return (
    <Layout>
      {token && <JourneysDisplay />}
    </Layout>
  );
};

export default HomePage;
