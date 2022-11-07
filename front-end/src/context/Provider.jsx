/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

import usePersistedState from '../hooks/usePersistentState';
import { requestGet, setHeaderToken } from '../utils/Resquest';

export const HomeerContext = createContext();

export function Provider({ children }) {
  const [user, setUser] = usePersistedState('user', {
    name: '', email: '', role: '', token: '',
  });
  const [cart, setCart] = usePersistedState('cart', []);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productsCart, setProductsCart] = useState([]);

  const logout = () => {
    setUser(undefined);
    setIsSignedIn(false);
  };

  const memorizedContext = useMemo(() => ({
    user: {
      currentUser: user,
      ...user,
      setUser,
    },
    login: {
      isSignedIn,
      logout,
      setIsSignedIn,
    },
    loading: {
      loading,
      setLoading,
    },
    cart: {
      cart,
      setCart,
    },
    products: {
      productsCart,
      setProductsCart,
    },
  }), [user, setUser, isSignedIn, logout, loading, cart, setCart, productsCart, setProductsCart]);

  useEffect(() => {
    if (user.token) {
      try {
        setHeaderToken(user.token);

        requestGet('/user').then((resp) => {
          setUser({ ...user, name: resp.name, email: resp.email, role: resp.role });

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
