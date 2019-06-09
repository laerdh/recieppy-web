import React from 'react';
import './App.css';
import NavigationBar from './components/navigationbar/navigationbar';
import WeekList from './components/weeklist/weeklist';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="content-container">
        <WeekList />
      </div>
    </div>
  );
}

export default App;
