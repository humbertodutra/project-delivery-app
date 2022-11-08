import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeerContext } from '../../../context/Provider';
import { requestPost, requestGet } from '../../../utils/Resquest';

export default function CartForm() {
  const [user, setUser] = useState('');
  const [sellerId, setSellerId] = useState();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  const {
    cart: {
      cart,
    } } = useContext(HomeerContext);

  // const navigate = useNavigate();

  useEffect(() => {
    const getSellers = async () => {
      const data = await requestGet('/user/role/seller');
      setSellers(data);
      setSellerId(data[0].id);
    };

    const getUser = async () => {
      const data = await requestGet('/user');
      setUser(data);
    };
    getSellers();
    getUser();
  }, []);

  // const dateFormat = () => {
  //   const date = new Date();
  //   const dateFormatPt = new Intl.DateTimeFormat('pt-BR').format(date);
  //   return dateFormatPt;
  // };

  const handleClick = async () => {
    // const token = localStorage.getItem('token');
    const body = {
      userId: user.id,
      sellerId,
      totalPrice:
       Number(cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2)),
      deliveryAddress,
      deliveryNumber,
      orders: cart.map(({ id, quantity }) => ({ productId: id, quantity })),
    };

    const a = await requestPost(
      '/customer/orders',
      body,
    );

    console.log(a);
    const { id } = a;

    navigate(`/customer/orders/${id}`);
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
          onClick={ ({ target }) => setSellerId(Number(target.value)) }
        >
          {sellers.length > 0
          && sellers.map(({ name, id }) => (
            <option
              key={ `sellers-${id}` }
              value={ id }
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
