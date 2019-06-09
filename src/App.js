import React from 'react';
import './App.css';
import NavigationBar from './components/navigationbar/navigationbar';
import CircleView from './components/circleview/circleview';
import MealItem from './components/mealitem/mealitem';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="content-container">
        <div className="container">
          <CircleView color={'rgb(232, 101, 100)'} initial={'Man'} />
          <div className="item-container">
            <MealItem />
          </div>
        </div>
        <div className="container">
          <CircleView color={'rgb(132, 202, 220)'} initial={'Tir'} />
          <div className="item-container">
            <MealItem />
          </div>
        </div>
        <div className="container">
          <CircleView color={'rgb(237, 209, 39)'} initial={'Ons'} />
          <div className="item-container">
            <MealItem />
          </div>
        </div>
        <div className="container">
          <CircleView color={'rgb(232, 101, 100)'} initial={'Tor'} />
          <div className="item-container">
            <MealItem />
          </div>
        </div>
        <div className="container">
          <CircleView position={'bottom'} color={'rgb(132, 202, 220)'} initial={'Fre'} />
          <div className="item-container">
            <MealItem />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
