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
  OrderDetails,
} from './pages';
import DetailsSeller from './pages/Seller/Requests/DetailsSeller';

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
          <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        </Route>

        <Route path="/seller">
          <Route index />
          <Route path="/seller/orders" element={ <RequestsSeller /> } />
          <Route path="/seller/orders/:id" element={ <DetailsSeller /> } />
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
