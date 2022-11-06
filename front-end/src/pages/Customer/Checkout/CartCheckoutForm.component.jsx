import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeerContext } from '../../../context/Provider';
import { requestPost, requestGet, setHeaderToken } from '../../../utils/Resquest';

export default function CartForm() {
  const [user, setUser] = useState('');
  const [sellerId, setSellerId] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  const { products: {
    productsCart,
    setProductsCart,
  } } = useContext(HomeerContext);

  // const navigate = useNavigate();

  useEffect(() => {
    const getSellers = async () => {
      const data = await requestGet('/user/role/seller');
      setSellers(data);
      console.log(data);
    };

    const getUser = async () => {
      const data = await requestGet('/user');
      setUser(data);
    };
    getSellers();
    getUser();
  }, []);

  const handleClick = async () => {
    // const token = localStorage.getItem('token');
    const body = {
      userId: user.id,
      sellerId,
      totalPrice: productsCart.reduce((acc, curr) => acc + Number(curr.subTotal), 0),
      deliveryAddress,
      deliveryNumber,
      orders: productsCart.map(({ id, quantity }) => ({ productId: id, quantity })),
    };
    const { id } = await requestPost(
      '/customer/orders',
      body,
    );
    console.log(id);

    navigate(`/customer/orders/${id}`);
  };

  const handleSeller = (id) => {
    const a = Number(id);
    setSellerId(a);
    console.log(sellerId);
    return null;
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

        >
          {sellers.length > 0
          && sellers.map(({ name, id }) => (
            <option
              key={ `sellers-${id}` }
              value={ id }
              onClick={ ({ target: { value } }) => handleSeller(value) }
            >
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
