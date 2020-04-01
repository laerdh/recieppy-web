import React from 'react';
import './CircleView.css';

interface CircleViewProps {
    theme: string
    title: string
    isLastElement: boolean
}

const CircleView = (props: CircleViewProps) => {
    return (
        <div className="circle-container">
            {!props.isLastElement &&
                <div className="circle-left-box"></div>
            }
            <div className="circle" style={{backgroundColor: props.theme}}>{props.title}</div>
        </div>
    )
}

export default CircleView