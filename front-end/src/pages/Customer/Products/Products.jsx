import React, { useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';
import ProductCard from '../../../components/ProductCard/ProductCard';

import { requestGet } from '../../../utils/Resquest';

import './Products.scss';

function Products() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    requestGet('/products')
      .then((response) => {
        setProducts(response);
      });
  }, []);

  return (
    <div className="app__flex app__products">
      <div className="app__flex app__products-space">
        {console.log(products)}
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
    </div>
  );
}

export default AppWrap(Products, Header, Footer);
