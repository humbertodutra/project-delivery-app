import React, { useMemo, useState, createContext } from 'react';
import PropTypes from 'prop-types';

import usePersistedState from '../hooks/usePersistentState';

export const HomeerContext = createContext();

export function Provider({ children }) {
  const [name, setName] = usePersistedState('name', 'Carregando!');
  const [email, setEmail] = usePersistedState('email', 'Carregando!');
  const [role, setRole] = usePersistedState('role', null);
  const [token, setToken] = usePersistedState('token', null);
  const [isSignedIn, setIsSignedIn] = useState(false);

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
  }), [
    name,
    setName,
    email,
    setEmail,
    token,
    setToken,
    role,
    setRole,
    isSignedIn,
    setIsSignedIn,
  ]);

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
