import { TableContainer } from '@mui/material';
import Header from '../../../../components/Header/Header';
import Footer from '../../../../components/Footer/Footer';
import AppWrap from '../../../../wrapper/AppWrap';
import TableComponent from '../../../../components/TableComponent/TableComponent';

function OrderDetails() {
  return (
    <>
      <h1>Detalhes do Pedido</h1>

      <div className="bar-info">
        <div><h2>Pedido number</h2></div>
        <div><h2>P.vendedora</h2></div>
        <div><h2>DATA</h2></div>
        <div><h2>Status</h2></div>
        <div><button type="button">MARCAR COMO ENTREGUE</button></div>
      </div>
      <TableContainer>
        <TableComponent />
      </TableContainer>
    </>
  );
}

export default AppWrap(OrderDetails, Header, Footer);
