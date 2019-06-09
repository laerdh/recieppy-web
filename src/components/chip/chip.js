import React from 'react';
import './chip.css';

const Chip = (props) => {
    return (
        <div className="chip">{props.title === undefined ? 'Ukjent' : props.title}</div>
    );
}

export default Chip;