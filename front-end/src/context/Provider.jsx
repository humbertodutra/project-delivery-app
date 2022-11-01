import React, { useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

import usePersistedState from '../hooks/usePersistentState';

export const HomeerContext = createContext();

export function Provider({ children }) {
  const [name, setName] = usePersistedState('name', 'Carregando!');
  const [email, setEmail] = usePersistedState('email', 'Carregando!');
  const [role, setRole] = usePersistedState('role', null);
  const [token, setToken] = usePersistedState('token', null);

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
  }), [name, setName, email, setEmail, token, setToken, role, setRole]);

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
