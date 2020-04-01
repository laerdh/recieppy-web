import React from 'react';
import './Spinner.css';

interface SpinnerProps {
    message?: string
}

const Spinner = (props: SpinnerProps) => {
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