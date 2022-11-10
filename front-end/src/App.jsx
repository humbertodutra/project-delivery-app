import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import {
  Login,
  Register,
  Products,
  Customer,
  Checkout,
  Orders,
  Manage,
  RequestsSeller,
} from './pages';
import TestComponent from './pages/Customer/Checkout/test.component';

// Feito pelo G4

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />

        <Route path="/customer">
          <Route index element={ <Customer /> } />
          <Route path="/customer/products" element={ <Products /> } />
          <Route path="/customer/checkout" element={ <Checkout /> } />
          <Route path="/customer/orders" element={ <Orders /> } />
          <Route path="/customer/orders/:id" element={ <TestComponent /> } />
        </Route>

        <Route path="/seller">
          <Route index />
          <Route path="/seller/orders" element={ <RequestsSeller /> } />
          <Route path="/seller/orders/:id" />
        </Route>

        <Route path="/admin">
          <Route index />
          <Route path="/admin/manage" element={ <Manage /> } />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
