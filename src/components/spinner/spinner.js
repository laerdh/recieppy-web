import React from 'react';
import './spinner.css';

const Spinner = (props) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            {props.message && 
                <h5 className="spinner-message">{props.message}</h5>
            }
        </div>
    );
}

export default Spinner;