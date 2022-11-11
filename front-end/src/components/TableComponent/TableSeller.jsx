import PropTypes from 'prop-types';
import React from 'react';

export default function TableSeller({ products }) {
  const calculateTotal = products.reduce((acc, curr) => {
    const multiplica = Number(curr.price) * Number(curr.quantity.quantity);
    const result = acc + multiplica;
    return result;
  }, 0);

  console.log(products);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={ product.name }>
              <td
                data-testid={
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={ ` seller_order_details__element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.quantity.quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {product.price.replace('.', ',')}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {(Number(product.price) * Number(product.quantity.quantity))
                  .toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 data-testid="seller_order_details__element-order-total-price">
          Total:
          {calculateTotal.toFixed(2).replace('.', ',')}
        </h1>
      </div>
    </>
  );
}

TableSeller.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.shape({ quantity: PropTypes.number.isRequired }),
  })).isRequired,
};
