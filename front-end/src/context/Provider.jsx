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
      email,
      role,
      token,
    },
  }), [name, email, token, role]);

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
