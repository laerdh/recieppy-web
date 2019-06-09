import React from 'react';
import './mealitem.css';
import Chip from '../chip/chip';

const MealItem = () => {
    return (
        <div className="meal-item" draggable>
            <div className="meal-header">
                <div className="meal-thumbnail">
                    <img src="https://images.matprat.no/ge4ln2vspg-jumbotron/large" alt="Meal thumbnail" style={{borderRadius: '32px', width: '100%', height: '100%'}}></img>
                </div>
                <div className="meal-header-content">
                    <h4 className="meal-title">Grillede koteletter med tomat og mozzarella </h4>
                    {/* Insert date created + other */ }
                </div>
            </div>
            <div className="meal-description">Koteletter er enkelt å hanskes med, og anses av mange som perfekt for grillings. Her har vi gjort en italiensk vri og toppet kotelettene med mozzarella og småtomater vendt i pesto. Super grillmat!</div>
            <div className="meal-chip-container">
                <Chip title={'Kjøtt'} />
                <Chip title={'Ost'} />
            </div>
        </div>
    );
}

export default MealItem;