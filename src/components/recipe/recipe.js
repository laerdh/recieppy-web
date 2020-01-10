import React from 'react';
import './recipe.css';
import Chip from '../chip/chip';

const Recipe = (props) => {
    return (
        <div className="recipe-item" onDragStart={(e) => props.onDragStart(e)} draggable>
            <div className="recipe-header">
                <div className="recipe-thumbnail">
                    <img src="https://images.matprat.no/ge4ln2vspg-jumbotron/large" alt="Recipe thumbnail" style={{borderRadius: '32px', width: '100%', height: '100%'}}></img>
                </div>
                <div className="recipe-header-content">
                    <h4 className="recipe-title">{props.title}</h4>
                    {/* Insert date created + other */ }
                </div>
            </div>
            <div className="recipe-description">{props.description}</div>
            <div className="recipe-chip-container">
                <Chip title={'Kjøtt'} />
                <Chip title={'Ost'} />
            </div>
        </div>
    );
}

export default Recipe;