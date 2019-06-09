import React from 'react';
import './roundedbutton.css';

const RoundedButton = (props) => {
    return (
        <div className="rounded-button">{props.title}</div>
    );
}

export default RoundedButton;