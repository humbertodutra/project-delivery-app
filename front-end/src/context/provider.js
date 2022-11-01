import React, { useState } from 'react';
import CartContext from './cart';
import data from '../pages/Checkout/productsMock.json';

function CartProvider({ children }) {
  const [productsCart, setProductsCart] = useState(data);

  function addProducToCart(id) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (!item) {
      copyProductsCart.push({ id, quantidade: 1 });
    } else {
      item.quantidade += 1;
    }

    setProductsCart(copyProductsCart);
  }

  function removeProductToCart(id) {
    const copyProductsCart = [...productsCart];

    const item = copyProductsCart.find((product) => product.id === id);

    if (item && item.quantidade > 1) {
      item.quantidade -= 1;
      setProductsCart(copyProductsCart);
    } else {
      const arrayFiltered = copyProductsCart.filter(
        (product) => product.id !== id,
      );
      setProductsCart(arrayFiltered);
    }
  }

  function clearCart() {
    setProductsCart([]);
  }

  return (
    <CartContext.Provider
      value={ {
        setProductsCart,
        productsCart,
        addProducToCart,
        removeProductToCart,
        clearCart } }
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
