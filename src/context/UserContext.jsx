import React, {
  createContext, useReducer, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const userContext = createContext();

export const defaultUserContextState = {
  username: undefined,
  token: undefined,
};

export const userReducer = (_, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER':
      localStorage.setItem('accessToken', payload.token);
      return {
        username: payload.username,
        token: payload.token,
      };
    case 'REMOVE_USER':
      localStorage.removeItem('accessToken');
      return {
        username: undefined,
        token: undefined,
      };
    default:
      throw new Error('Invalid action');
  }
};

export const UserContextProvider = ({ children, value }) => (
  <userContext.Provider value={value}>
    {children}
  </userContext.Provider>
);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    currentUser: PropTypes.shape().isRequired,
    userDispatch: PropTypes.func.isRequired,
  }).isRequired,
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultUserContextState);
  const [apiResponse, setApiResponse] = useState(undefined);

  const submitRefreshToken = () => {
    axios.get(`http://${process.env.URL || '10.1.0.215'}:8000/auth/token`, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status !== 200) {
          setApiResponse(undefined);
        } else {
          const { token, username } = res.data;
          setApiResponse({
            token,
            username,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const refreshAccessToken = (details) => {
    if (details) {
      return dispatch({
        type: 'SET_USER',
        payload: {
          username: details.username,
          token: details.token,
        },
      });
    }
    return dispatch({
      type: 'REMOVE_USER',
    });
  };

  useEffect(() => {
    if (apiResponse) {
      refreshAccessToken(apiResponse);
    }
  }, [apiResponse]);

  return (
    <UserContextProvider value={{
      currentUser: state,
      userDispatch: dispatch,
      refreshToken: submitRefreshToken,
    }}
    >
      {children}
    </UserContextProvider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
