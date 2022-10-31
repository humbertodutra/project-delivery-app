import React from 'react';

import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import { CgLogOut } from 'react-icons/cg';

import Images from '../../constants/images';

import './Header.scss';

const user = 'Usuário';

function Header() {
  return (
    <div className="app__flex app__header">
      <div className="app__header-logo">
        <img src={ Images.Logo } alt="logo" />
      </div>

      <div className="app__header-nav">
        <Button
          data-testid="customer_products__element-navbar-link-products"
          variant="outlined"
        >
          Produtos
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-orders"
          variant="outlined"
        >
          Meus Pedidos
        </Button>
      </div>

      <div className="app__flex app__header-user">
        <p data-testid="customer_products__element-navbar-user-full-name">{user}</p>
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
