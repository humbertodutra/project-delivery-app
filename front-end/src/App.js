import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Login, Register } from './pages';

// Feito pelo G4

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </Router>
  );
}

export default App;
