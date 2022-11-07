/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';
import ProductCard from '../../../components/ProductCard/ProductCard';

import { requestGet } from '../../../utils/Resquest';
import { HomeerContext } from '../../../context/Provider';

import './Products.scss';

function Products() {
  const [products, setProducts] = useState([]);
  const { cart: { cart, setCart } } = useContext(HomeerContext);

  const navigate = useNavigate();

  const calculateTotal = () => {
    const total = cart.reduce((acc, { subTotal }) => acc + subTotal, 0);
    return total.toFixed(2).replace('.', ',');
  };

  const newItemCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  const removeItemCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const updateItemCart = ({ id, quantity, subTotal }) => {
    if (quantity === 0) return removeItemCart(id);

    const newCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity, subTotal };
      }
      return item;
    });
    setCart(newCart);
  };

  const findItemInCart = (id) => cart.find((item) => item.id === id);

  const onInputChange = (product) => {
    console.log('Executou!', product);
    const itemInCart = findItemInCart(product.id);
    if (!itemInCart) return newItemCart(product);

    updateItemCart(product);
  };

  useEffect(() => {
    requestGet('/products')
      .then((response) => {
        const newResp = response.map((product) => {
          const qntCart = findItemInCart(product.id);
          if (qntCart) {
            return { ...product, quantity: qntCart.quantity };
          }
          return { ...product, quantity: 0 };
        });

        console.log('Products', newResp);
        setProducts(newResp);
      });
  }, []);

  return (
    <div className="app__flex app__products">
      <div className="app__flex app__products-space">
        {console.log(products)}
        {console.log(cart)}
        {products ? (
          <>
            {
              products.map((product) => (
                <ProductCard
                  key={ product.id }
                  id={ product.id }
                  name={ product.name }
                  price={ product.price }
                  urlImage={ product.urlImage }
                  defaultQnt={ product.quantity }
                  onInputChange={ onInputChange }
                />
              ))
            }
          </>
        ) : (
          <div>
            <h1>Carregando...</h1>
          </div>
        )}
      </div>

      <button
        type="button"
        data-testid="customer_products__button-cart"
        className="app__flex app__products-cart box-shadow"
        disabled={ cart.length === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        <h3>Ver Carrinho: </h3>
        <div className="app__flex">
          <p>R$</p>
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            { calculateTotal() }
          </p>
        </div>
      </button>
    </div>
  );
}

export default AppWrap(Products, Header, Footer);
