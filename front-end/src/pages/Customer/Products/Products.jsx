import React, { useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';
import ProductCard from '../../../components/ProductCard/ProductCard';

import { requestGet } from '../../../utils/Resquest';

function Products() {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    requestGet('/products')
      .then((response) => {
        setProducts(response);
      });
  }, []);

  return (
    <div>
      {console.log(products)}
      {products ? (
        <div>
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
        </div>
      ) : (
        <div>
          <h1>Carregando...</h1>
        </div>
      )}
    </div>
  );
}

export default AppWrap(Products, Header, Footer);
