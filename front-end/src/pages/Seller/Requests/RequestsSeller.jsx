import React from 'react';
import SellerCard from '../../../components/SellerCard/SellerCard';

function RequestsSeller() {
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
  return (
    mockSales.map((sale) => (<SellerCard
      key={ sale.id }
      id={ sale.id }
      status={ sale.status }
      totalPrice={ sale.total_price }
      deliveryAddress={ sale.delivery_address }
      deliveryNumber={ sale.delivery_number }
      saleDate={ sale.sale_date }
    />))
  );
}

export default RequestsSeller;
