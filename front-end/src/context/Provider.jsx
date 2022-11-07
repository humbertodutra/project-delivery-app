import React, { useMemo, useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import usePersistedState from '../hooks/usePersistentState';
import { requestGet, setHeaderToken } from '../utils/Resquest';

export const HomeerContext = createContext();

export function Provider({ children }) {
  const [name, setName] = usePersistedState('name', 'Carregando!');
  const [email, setEmail] = usePersistedState('email', 'Carregando!');
  const [role, setRole] = usePersistedState('role', null);
  const [token, setToken] = usePersistedState('token', null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const memorizedContext = useMemo(() => ({
    user: {
      name,
      setName,
      email,
      setEmail,
      role,
      setRole,
      token,
      setToken,
    },
    login: {
      isSignedIn,
      setIsSignedIn,
    },
    loading: {
      loading,
      setLoading,
    },
  }), [
    name,
    setName,
    email,
    setEmail,
    token,
    setToken,
    role,
    setRole,
    loading,
    setLoading,
    isSignedIn,
    setIsSignedIn,
  ]);

  useEffect(() => {
    if (token) {
      try {
        setHeaderToken(token);

        requestGet('/user').then((resp) => {
          setName(resp.name);
          setEmail(resp.email);
          setRole(resp.role);

          setIsSignedIn(true);

          return setLoading(false);
        });
      } catch (error) {
        console.log(error);
        return setIsSignedIn(false);
      }
    }

    setIsSignedIn(false);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeerContext.Provider value={ memorizedContext }>
      {children}
    </HomeerContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
