import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { CartContext } from '../../context/cart';
import data from './productsMock.json';
import CartContext from '../../context/cart';

function Cart() {
  const {
    productsCart,
    addProducToCart,
    removeProductToCart,
    clearCart,
  } = useContext(CartContext);

  const products = productsCart;

  return (

    <div>
      <button type="button" onClick={ clearCart }>Limpar Carrinho</button>
      {products.map((product) => (
        <div className="cart" key={ product.id }>
          <div className="container">
            <h2>{product.name}</h2>
            <h3>
              R$
              {product.price}
            </h3>
            <h3>
              {productsCart.find((item) => item.id === product.id)?.quantidade
                ? productsCart.find((item) => item.id === product.id)?.quantidade
                : 0}
            </h3>
            <button type="button" onClick={ () => addProducToCart(product.id) }>+</button>
            <button
              type="button"
              onClick={ () => removeProductToCart(product.id) }
            >
              -

            </button>
          </div>
          <img src={ product.url_image } alt="product-url" style={ { width: '100px' } } />
        </div>
      ))}
    </div>
  );
}

export default Cart;
