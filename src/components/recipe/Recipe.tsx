import React from 'react';
import './Recipe.css';
import Chip from '../chip/Chip';

interface RecipeProps {
    title: string
    description: string
    imageUrl?: string
    tags: string[]

    onDragStart: (event: React.DragEvent) => void 
}

const Recipe = (props: RecipeProps) => {
    return (
        <div className="recipe-item" onDragStart={(event: React.DragEvent) => props.onDragStart(event)} draggable>
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
                { props.tags.map((tag, index) => {
                    return <Chip key={index} title={tag} />
                })}
            </div>
        </div>
    )
}

export default Recipe