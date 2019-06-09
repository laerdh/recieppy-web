import React from 'react';
import './circleview.css';

const CircleView = (props) => {
    return (
        <div className="circle-container">
            {props.position !== 'bottom' &&
                <div className="circle-left-box"></div>
            }
            <div className="circle" style={{backgroundColor: props.theme.color}}>{props.title}</div>
        </div>
    );
}

export default CircleView;