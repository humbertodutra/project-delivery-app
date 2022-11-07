import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import OrderCard from '../../components/OrderCard/OrderCard';
import AppWrap from '../../wrapper/AppWrap';

function MyRequests() {
  const vendas = [
    {
      id: 1,
      userId: 2,
      sellerId: 2,
      totalPrice: '10.99',
      deliveryAddress: 'Rua da mata',
      deliveryNumber: '50',
      saleDate: '2022-11-07T17:44:15.000Z',
      status: 'delivered',
    },
    {
      id: 2,
      userId: 3,
      sellerId: 1,
      totalPrice: '11.99',
      deliveryAddress: 'Avenida das flores',
      deliveryNumber: '60',
      saleDate: '2022-11-07T17:44:15.000Z',
      status: 'waiting the payment',
    },
  ];

  return (
    vendas.map(({ id, status, saleDate, totalPrice }) => (
      <OrderCard
        key={ id }
        id={ id }
        status={ status }
        saleDate={ saleDate }
        totalPrice={ totalPrice }
      />))
  );
}

export default AppWrap(MyRequests, Header, Footer);
