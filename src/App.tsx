import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/Router';
import NavigationBar from './components/navigationbar/NavigationBar';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavigationBar />
        <div className="content-container">
          <BrowserRouter children={Routes} basename={"/"} />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
