/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TableContainer } from '@mui/material';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import AppWrap from '../../../../wrapper/AppWrap';
import TableComponent from '../../../../components/TableComponent/TableComponent';
import './OrderDetails.scss';
import { requestGet } from '../../../../utils/Resquest';
// import TableSeller from '../../../../components/TableComponent/TableComponentTwo';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [sellerName, setSellerName] = useState('');

  const date = () => {
    if (order) {
      const dat = new Date(order?.saleDate);
      const dateFormat = new Intl.DateTimeFormat('pt-BR').format(dat);
      return dateFormat;
    }
  };

  const dataTestString = 'customer_order_details__element-order-details-label-delivery-status';

  useEffect(() => {
    requestGet(`/customer/orders/${id}`).then((response) => {
      setOrder(response[0]);
    });
  }, []);

  useEffect(() => {
    console.log(order);
    if (order !== null) {
      requestGet(`/user/${order.sellerId}`).then((res) => setSellerName(res.name));
    }
  }, [order]);

  return (
    <div className="container-table">
      <h1>Detalhes do Pedido</h1>

      <div className="bar-info">
        <div>
          <h2
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido: ${order?.id}`}
          </h2>
        </div>

        <div>
          <h2
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {`Vendedor: ${sellerName}`}
          </h2>
        </div>

        <div>
          <h2
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {date()}
          </h2>
        </div>

        <div>
          <h2
            data-testid={ dataTestString }
          >
            {order?.status}
          </h2>
        </div>
        <div>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      </div>
      {/* {order && <TableSeller products={ order?.products } />} */}
      <TableContainer className="table-mui">
        {order && <TableComponent products={ order?.products } />}
      </TableContainer>
    </div>
  );
}

export default AppWrap(OrderDetails, Header, Footer);
