import React from 'react';
import './mealitem.css';
import Chip from '../chip/chip';

const MealItem = (props) => {
    return (
        <div className="meal-item" draggable>
            <div className="meal-header">
                <div className="meal-thumbnail">
                    <img src="https://images.matprat.no/ge4ln2vspg-jumbotron/large" alt="Meal thumbnail" style={{borderRadius: '32px', width: '100%', height: '100%'}}></img>
                </div>
                <div className="meal-header-content">
                    <h4 className="meal-title">{props.title}</h4>
                    {/* Insert date created + other */ }
                </div>
            </div>
            <div className="meal-description">{props.description}</div>
            <div className="meal-chip-container">
                <Chip title={'Kjøtt'} />
                <Chip title={'Ost'} />
            </div>
        </div>
    );
}

export default MealItem;