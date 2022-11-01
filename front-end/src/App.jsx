import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Login, Checkout } from './pages';

// Feito pelo G4

function App() {
  const name = 'paulo';
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path={ `/${name}/checkout` } element={ <Checkout /> } />
      </Routes>
    </Router>
  );
}

export default App;
