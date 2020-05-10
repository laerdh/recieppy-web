import './CardView.css';
import React from 'react';

export interface CardViewProps {
    title: string
    description: string
    imageUrl: string
}

const CardView = (props: CardViewProps) => {
    return (
        <div className="card-container" style={{ backgroundImage: "url(" + props.imageUrl + ")"}}>
            <div className="card-overlay">
                <h3 className="content title">{props.title}</h3>
                <p className="content description">{props.description}</p>
            </div>
        </div>
    )
}

export default CardView