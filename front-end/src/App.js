import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Login, Register, Products, Customer, MyRequests, RequestsSeller } from './pages';

// Feito pelo G4 Rerun

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
          <Route path="/customer/orders" element={ <MyRequests /> } />
        </Route>
        <Route path="/seller" element={ <RequestsSeller /> } />
        <Route path="seller/orders/:id" />
      </Routes>
    </Router>
  );
}

export default App;
