import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SellerCard from '../../../components/SellerCard/SellerCard';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import { requestGet } from '../../../utils/Resquest';

import AppWrap from '../../../wrapper/AppWrap';

function RequestsSeller() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  const navigateOrderDetails = (id) => {
    navigate(`/seller/orders/${id}`);
  };

  useEffect(() => {
    requestGet('/customer/orders')
      .then((response) => {
        setSales(response);
        console.log(response);
      });
  }, []);
  return (
    <>
      {
        sales.map((sale, index) => (
          <div
            key={ index }
            onClick={ () => navigateOrderDetails(sale.id) }
            onKeyDown={ () => {} }
            role="button"
            tabIndex="0"
          >
            <SellerCard
              id={ sale.id }
              status={ sale.status }
              totalPrice={ sale.totalPrice }
              deliveryAddress={ sale.deliveryAddress }
              deliveryNumber={ sale.deliveryNumber }
              saleDate={ sale.saleDate }
            />
          </div>
        ))
      }
    </>
  );
}

export default AppWrap(RequestsSeller, Header, Footer);
