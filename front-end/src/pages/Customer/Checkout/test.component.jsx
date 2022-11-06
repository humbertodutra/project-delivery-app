import React, { useContext, useEffect, useState } from 'react';
import data from './productsMock.json';
import CartTable from './CartTable.component';
import CartForm from './CartCheckoutForm.component';
import { HomeerContext } from '../../../context/Provider';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import AppWrap from '../../../wrapper/AppWrap';

function test() {
  return (
    <main>
      <p> oi </p>
    </main>

  );
}

export default AppWrap(test, Header, Footer, null);
