import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import IconButton from '@mui/material/IconButton';

import './ProductCard.scss';

function ProductCard({ id, name, price, urlImage }) {
  return (
    <div
      className="app__flex box-shadow app__productcard"
      data-testid="product-card"
    >

      <div className="app__flex app__productcard-price">
        <p>R$</p>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { price.replace('.', ',') }
        </p>
      </div>

      <img
        className="app__productcard-image"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />

      <div className="app__flex app__productcard-info">

        <h3
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </h3>

        <div className="app__flex app__productcard-buttons">
          <IconButton
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="app__productcard-button"
          >
            <AiOutlineMinus />
          </IconButton>

          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className="app__productcard-quantity"
            type="text"
            defaultValue={ 0 }
          />

          <IconButton
            data-testid={ `customer_products__button-card-add-item-${id}` }
            className="app__productcard-button"
          >
            <AiOutlinePlus />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
