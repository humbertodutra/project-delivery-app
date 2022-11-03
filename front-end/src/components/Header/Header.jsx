import React, { useContext } from 'react';

import { Button } from '@mui/material';
import { CgLogOut } from 'react-icons/cg';

import { useNavigate } from 'react-router';
import Images from '../../constants/images';
import { HomeerContext } from '../../context/Provider';

import './Header.scss';

function Header() {
  const { user: { name } } = useContext(HomeerContext);
  const navigate = useNavigate();

  return (
    <div className="app__flex app__header">
      <div className="app__header-logo">
        <img src={ Images.Logo } alt="logo" />
      </div>

      <div className="app__header-nav">
        <Button
          data-testid="customer_products__element-navbar-link-products"
          variant="outlined"
          onClick={ () => navigate('/customer/products') }
        >
          Produtos
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-orders"
          variant="outlined"
          onClick={ () => navigate('/customer/requests') }
        >
          Meus Pedidos
        </Button>
      </div>

      <div className="app__flex app__header-user">
        <p data-testid="customer_products__element-navbar-user-full-name">{name}</p>
        <div
          role="button"
          data-testid="customer_products__element-navbar-link-logout"
          className="app__flex app__header-user-logout"
        >
          <CgLogOut />
        </div>
      </div>
    </div>
  );
}

export default Header;
