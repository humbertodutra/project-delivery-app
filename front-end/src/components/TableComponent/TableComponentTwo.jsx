import PropTypes from 'prop-types';

export default function TableSeller({ products }) {
  console.log(products);
  return (
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
        {products.map((product) => (
          <tr key={ product.id }>

            <td>{product.id}</td>

            <td>{product.name}</td>

            <td>{product.quantity.quantity}</td>

            <td>{product.price}</td>

            <td>{Number(product.price) * Number(product.quantity.quantity)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableSeller.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.shape({
      quantity: PropTypes.number.isRequired }) })).isRequired,
};
