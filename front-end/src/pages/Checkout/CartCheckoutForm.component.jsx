import { useState, useContext, useEffect } from 'react';
import { redirect } from "react-router-dom";
import axios from 'axios';
import CartContext from '../../context/cart';

export default function CartForm() {
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const { productsCart } = useContext(CartContext);

  useEffect(() => {
    // const getSellers = async () => {
    //   const { data } = await axios.get('http://localhost:3001/user/role/seller');
    //   setSellers(data);
    // };
    // getSellers();
    setSellers([{
      name: 'joao',
      id: 1,
    },
    {
      name: 'maria',
      id: 2,
    },

    ]);
  }, []);
  const handleClick = () => {
    // const token = localStorage.getItem('token');
    // const body = {
    //   userId: '',
    //   sellerId: '',
    //   totalPrice: productsCart.reduce((acc, curr) => acc + Number(curr.subTotal), 0),
    //   deliveryAddress,
    //   deliveryNumber,
    //   orders: [{ productId: 1, quantity: 2 }],
    // };
    // const { id: orderId } = axios.post(
    //   'http://localhost:3001/customer/orders',
    //   body,
    //   { headers: { Authorization: `${token}` } },
    // );
    // if (orderId) {
    //   history.push({
    //     pathname: `/customer/orders/${orderId}`,
    //     state: orderId,
    //   });
    // }
    console.log('oi');
  };
  return (
    <form>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          id="seller"
          value={ sellerId }
          onChange={ ({ target: { value } }) => setSellerId(value) }
        >
          {sellers.length > 0
          && sellers.map(({ name, id }) => (
            <option key={ `sellers-${id}` } value={ id }>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="delivery_address">
        Endereço:
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          id="delivery_address"
          onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
        />
      </label>

      <label htmlFor="delivery_number">
        Número:
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          value={ deliveryNumber }
          id="delivery_number"
          onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
        />
      </label>
      <button
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
