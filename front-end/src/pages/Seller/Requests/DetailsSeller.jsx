// import { TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import TableSeller from '../../../components/TableComponent/TableSeller';
import { requestGet, requestPatch } from '../../../utils/Resquest';
import AppWrap from '../../../wrapper/AppWrap';

function DetailsSeller() {
  const [order, setOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();

  const handleClick = async ({ target: { name } }) => {
    const patchStatus = await requestPatch(`/seller/orders/${id}`, { status: name });
    setUpdate(!update);
    return patchStatus;
  };

  useEffect(() => {
    async function getOrder() {
      const request = await requestGet(`/customer/orders/${id}`);
      setOrder(request);
    }
    getOrder();
  }, [id, update]);

  function date() {
    if (order[0] !== undefined) {
      const dat = new Date(order[0]?.saleDate);
      const dateFormat = new Intl.DateTimeFormat('pt-BR').format(dat);
      return dateFormat;
    }
  }
  console.log(order);
  return (
    <div className="container-table">
      <h1>Detalhes do Pedido</h1>
      <div className="bar-info">
        <div>
          <h2
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            Pedido
            { order[0] && order[0]?.id}
          </h2>
        </div>
        <h2
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          DATA
          { date()}
        </h2>
        <h2
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          { order[0] && order[0]?.status}
        </h2>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ handleClick }
          name="Preparando"
          disabled={
            order[0]?.status === 'Preparando' || order[0]?.status === 'Em Trânsito'
          }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ handleClick }
          name="Em Trânsito"
          disabled={
            order[0]?.status === 'Em Trânsito' || order[0]?.status === 'Pendente'
          }
        >
          SAIU PARA ENTREGA
        </button>
      </div>

      { order[0] && <TableSeller products={ order[0]?.products } /> }
    </div>
  );
}

export default AppWrap(DetailsSeller, Header, Footer);
