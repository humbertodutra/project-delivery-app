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
  console.log(totalPrice);

  const date = new Date(saleDate);
  const dateFormat = new Intl.DateTimeFormat('pt-BR').format(date);
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
          {dateFormat}
          {/* saleDate.slice(0, TEN).split('-').reverse().join('/')  */}
        </span>
        <span data-testid={ `seller_orders__element-card-price-${id}` }>
          {totalPrice.replace('.', ',')}
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
  totalPrice: PropTypes.string.isRequired,
};

export default SellerCard;
