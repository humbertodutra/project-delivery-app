import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Login, Register, Products, Customer } from './pages';

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
