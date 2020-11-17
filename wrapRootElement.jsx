/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import UserProvider from './src/context/UserContext';

export const wrapRootElement = ({ element }) => (
  <UserProvider>
    {element}
  </UserProvider>
);

wrapRootElement.propTypes = {
  element: PropTypes.node.isRequired,
};
