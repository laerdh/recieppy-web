import React from 'react';
import './RoundedButton.css';

interface RoundedButtonProps {
    title: string
}

const RoundedButton = (props: RoundedButtonProps) => {
    return (
        <div className="rounded-button">{props.title}</div>
    )
}

export default RoundedButton