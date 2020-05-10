import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/Router';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter children={Routes} basename={"/"} />
    </AuthProvider>
  );
}

export default App;
