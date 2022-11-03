import React, { useContext, useEffect } from 'react';
import data from './productsMock.json';
import CartContext from '../../context/cart';
import CartTable from './CartTable.component';
import CartForm from './CartCheckoutForm.component';

function Cart() {
  const {
    productsCart,
    setLoading,
    loading,
    setProductsCart,
  } = useContext(CartContext);

  useEffect(() => {
    setProductsCart(data);
    setLoading(false);
  }, [setLoading, setProductsCart]);

  return (
    <main>
      <section>
        <p> Header </p>
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

export default Cart;
