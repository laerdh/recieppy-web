import React from 'react';
import './App.css';
import NavigationBar from './components/navigationbar/navigationbar';
import RecipePlan from './components/recipeplan/recipeplan';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="content-container">
        <RecipePlan />
      </div>
    </div>
  );
}

export default App;
