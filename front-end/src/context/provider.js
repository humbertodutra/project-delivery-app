import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from './cart';

function CartProvider({ children }) {
  const [productsCart, setProductsCart] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // function addProducToCart(id) {
  //   const copyProductsCart = [...productsCart];

  //   const item = copyProductsCart.find((product) => product.id === id);

  //   if (!item) {
  //     copyProductsCart.push({ id, quantidade: 1 });
  //   } else {
  //     item.quantidade += 1;
  //   }

  //   setProductsCart(copyProductsCart);
  // }

  // function removeProductToCart(id) {
  //   const copyProductsCart = [...productsCart];

  //   const item = copyProductsCart.find((product) => product.id === id);

  //   if (item && item.quantidade > 1) {
  //     item.quantidade -= 1;
  //     setProductsCart(copyProductsCart);
  //   } else {
  //     const arrayFiltered = copyProductsCart.filter(
  //       (product) => product.id !== id,
  //     );
  //     setProductsCart(arrayFiltered);
  //   }
  // }

  // function clearCart() {
  //   setProductsCart([]);
  // }

  const providerValue = useMemo(() => ({
    setProductsCart,
    productsCart,
    loading,
    setLoading,
    user,
    setUser,
  }), [loading, productsCart, user, setProductsCart, setLoading, setUser]);

  return (
    <CartContext.Provider
      value={ providerValue }
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CartProvider;
