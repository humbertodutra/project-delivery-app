import React, { useEffect } from 'react';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';

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
      Products
    </div>
  );
}

export default AppWrap(Products, Header, Footer);
