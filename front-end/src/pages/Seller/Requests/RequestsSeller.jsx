import React from 'react';
import { useNavigate } from 'react-router';
import SellerCard from '../../../components/SellerCard/SellerCard';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';

import AppWrap from '../../../wrapper/AppWrap';

function RequestsSeller() {
  const navigate = useNavigate();

  const navigateOrderDetails = (id) => {
    navigate(`/seller/orders/${id}`);
  };

  const mockSales = [
    {
      id: 1,
      user_id: 2,
      seller_id: 2,
      total_price: 10.99,
      delivery_address: 'Rua da mata',
      delivery_number: '50',
      sale_date: '11/05/2022',
      status: 'delivered',
    },
    {
      id: 2,
      user_id: 3,
      seller_id: 1,
      total_price: 11.99,
      delivery_address: 'Avenida das flores',
      delivery_number: '60',
      sale_date: '13/05/2022',
      status: 'waiting the payment',
    },
  ];
  console.log(mockSales);
  return (
    <>
      {
        mockSales.map((sale, index) => (
          <div
            key={ index }
            onClick={ () => navigateOrderDetails(id) }
            onKeyDown={ () => {} }
            role="button"
            tabIndex="0"
          >
            <SellerCard
              id={ sale.id }
              status={ sale.status }
              totalPrice={ sale.total_price }
              deliveryAddress={ sale.delivery_address }
              deliveryNumber={ sale.delivery_number }
              saleDate={ sale.sale_date }
            />
          </div>
        ))
      }
    </>
  );
}

export default AppWrap(RequestsSeller, Header, Footer);
