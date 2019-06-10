import React from 'react';
import './circleview.css';

const CircleView = (props) => {
    return (
        <div className="circle-container">
            {!props.isLastElement &&
                <div className="circle-left-box"></div>
            }
            <div className="circle" style={{backgroundColor: props.theme}}>{props.title}</div>
        </div>
    );
}

export default CircleView;