import React, { useContext, useEffect, useState } from 'react';
import data from './productsMock.json';
import CartTable from './CartTable.component';
import CartForm from './CartCheckoutForm.component';
import { HomeerContext } from '../../../context/Provider';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';

function Cart() {
  const {
    products: {
      productsCart,
      setProductsCart,
    },
  } = useContext(HomeerContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProductsCart(data);
    setLoading(false);
  }, [setLoading, setProductsCart]);

  return (
    <main>
      <section>
        <h3> Finalizar Pedido </h3>
        { loading ? (
          <h2>Carregando ...</h2>)
          : (
            <CartTable
              dataTest="customer_checkout__element-order-table"
              dataTestTotal="customer_checkout"
              products={ productsCart }
            />
          )}
      </section>

      <section>
        <h3>Detalhes e Endereço para Entrega</h3>
        <CartForm />
      </section>
    </main>

  );
}

export default AppWrap(Cart, Header, Footer, null);
