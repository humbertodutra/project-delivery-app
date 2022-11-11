import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import { CgLogOut } from 'react-icons/cg';

import Images from '../../constants/images';
import { HomeerContext } from '../../context/Provider';

import './Header.scss';

function Header() {
  const { user: { name }, login: { logout } } = useContext(HomeerContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
          onClick={ () => navigate('/customer/orders') }
        >
          Meus Pedidos
        </Button>
      </div>

      <div className="app__flex app__header-user">
        <p data-testid="customer_products__element-navbar-user-full-name">{name}</p>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          className="app__flex app__header-user-logout"
          onClick={ handleLogout }
        >
          <CgLogOut />
        </button>
      </div>
    </div>
  );
}

export default Header;
