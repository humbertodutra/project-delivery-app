import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import OrderCard from '../../../components/OrderCard/OrderCard';
import AppWrap from '../../../wrapper/AppWrap';
import { requestGet } from '../../../utils/Resquest';

function Orders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    requestGet('/customer/orders').then((response) => {
      setOrders(response);
    });
  }, []);

  console.log(orders);
  return (
    orders.map(({ id, status, saleDate, totalPrice }) => (
      <div
        key={ id }
        onClick={ () => navigate(`/customer/orders/${id}`) }
        onKeyDown={ () => {} }
        role="button"
        tabIndex="0"
      >
        <OrderCard
          id={ id }
          status={ status }
          saleDate={ saleDate }
          totalPrice={ totalPrice }
        />
      </div>
    ))
  );
}

export default AppWrap(Orders, Header, Footer);
