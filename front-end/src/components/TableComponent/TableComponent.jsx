import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

export default function TableComponent({ products }) {
  const calculateTotal = products.reduce((acc, curr) => {
    const mult = Number(curr.price) * Number(curr.quantity.quantity);
    const result = acc + mult;
    return result;
  }, 0);

  return (
    <Table align="center" sx={ { width: 800 } } aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Item</TableCell>
          <TableCell align="center">Descrição</TableCell>
          <TableCell align="center">Quantidade</TableCell>
          <TableCell align="center">Valor Unitário</TableCell>
          <TableCell align="center">Sub-total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={ product.name }>
            <TableCell
              data-testid={
                `customer_order_details__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </TableCell>

            <TableCell
              data-testid={ `customer_order_details__element-order-table-name-${index}` }
            >
              {product.name}
            </TableCell>

            <TableCell
              data-testid={
                `customer_order_details__element-order-table-quantity-${index}`
              }
            >
              {product.quantity.quantity}
            </TableCell>

            <TableCell
              data-testid={
                `customer_order_details__element-order-table-sub-total-${index}`
              }
            >
              {product.price}
            </TableCell>

            <TableCell
              data-testid={
                `customer_order_details__element-order-total-price-${index}`
              }
            >
              {Number(product.price) * Number(product.quantity.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <div>
        <h1 data-testid="customer_order_details__element-order-total-price">
          Total:
          {calculateTotal.toFixed(2)}
        </h1>
      </div>
    </Table>
  );
}

TableComponent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.shape({ quantity: PropTypes.number }),
  })).isRequired,
};
