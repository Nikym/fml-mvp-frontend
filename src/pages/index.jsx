import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.root}>
        <h1>Welcome!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed sagittis porta nisl eu dapibus. Etiam elit felis, ultricies ut lacinia molestie,
          placerat eu ligula. In consequat nibh ex, sed laoreet lorem elementum eget.
          Suspendisse faucibus metus in lobortis hendrerit. Morbi sagittis sapien quis
          nisi aliquam, at volutpat lacus venenatis. Nam eleifend lacus sed nisl faucibus
          iaculis. Duis porttitor finibus massa, id suscipit ante gravida at.
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;
