import PropTypes from 'prop-types';
import React from 'react';
import './SellerCard.scss';
// trabalhando nessa branch
function SellerCard({
  id,
  status,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate }) {
  return (
    <div
      className="app__request-card"
    >
      <div className="app__request-card-id">
        <span data-testid={ `seller_orders__element-order-id-${id}` }>
          00
          {id}
        </span>
      </div>
      <div className="app__request-card-status">
        <span data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </span>
      </div>
      <div className="app__request-card-date-price">
        <span data-testid={ `seller_orders__element-order-date-${id}` }>
          {saleDate}
        </span>
        <span data-testid={ `seller_orders__element-card-price-${id}` }>
          {totalPrice}
        </span>
        <p
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          {deliveryAddress}
          ,
          {deliveryNumber}
        </p>
      </div>

    </div>
  );
}

SellerCard.propTypes = {
  deliveryAddress: PropTypes.string.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default SellerCard;
