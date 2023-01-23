import React from 'react';
import './Chip.css';

interface ChipProps {
    title?: string
}

const Chip = (props: ChipProps) => {
    return (
        <div className="chip">{props.title === undefined ? 'Ukjent' : props.title}</div>
    )
}

export default Chip