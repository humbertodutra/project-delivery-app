import React, { useMemo, useCallback, useState, useEffect, createContext } from 'react';
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

  const logout = useCallback(async () => {
    await setUser({
      name: '', email: '', role: '', token: '',
    });
    await setCart([]);
    await setIsSignedIn(false);
    await setHeaderToken('');
  }, [setUser, setCart, setIsSignedIn]);

  const memorizedContext = useMemo(
    () => ({
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
    }),
    [
      user,
      setUser,
      isSignedIn,
      logout,
      loading,
      cart,
      setCart,
      productsCart,
      setProductsCart,
    ],
  );

  useEffect(() => {
    console.info('PROVIDER RODANDO!');

    async function loadUser() {
      const userString = localStorage.getItem('user');
      const userObj = await JSON.parse(userString);

      if (userObj.token) {
        try {
          setHeaderToken(userObj.token);
          const resp = await requestGet('/user');
          setUser({ ...userObj, name: resp.name, email: resp.email, role: resp.role });

          setIsSignedIn(true);
          return setLoading(false);
        } catch (error) {
          console.log(error);
          return setIsSignedIn(false);
        }
      }
    }

    loadUser();

    setIsSignedIn(false);
    setLoading(false);
  }, [setUser]);

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
