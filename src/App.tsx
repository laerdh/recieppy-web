import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/Router';
import NavigationBar from './components/navigationbar/NavigationBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <AuthProvider>
          <NavigationBar />
          <div className="content-container">
            { Routes }
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
