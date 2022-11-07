import PropTypes from 'prop-types';
import './OrderCard.scss';

export default function OrderCard({ id, status, saleDate, totalPrice }) {
  return (
    <div className="app__request-card">
      <div className="app__request-card-number-id">
        <span>Pedido</span>
        <h3
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {id}
        </h3>
      </div>

      <div className="app__request-card-status">
        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </p>
      </div>

      <div className="app__request-card-data-value">
        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {saleDate}
        </span>
        <span
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          {totalPrice}
        </span>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};
