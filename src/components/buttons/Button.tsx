import React from 'react';
import './Button.css';

export enum ButtonType {
    Primary,
    Secondary
}

export interface PrimaryButtonProps {
    text: string
    type: ButtonType
    onClick?: () => void
}

const Button = (props: PrimaryButtonProps) => {
    const getButtonType = (): string => {
        let buttonClass = ['button']

        switch (props.type) {
            case ButtonType.Primary:
                buttonClass.push('primary')
                break
            case ButtonType.Secondary:
                buttonClass.push('secondary')
                break
        }

        return buttonClass.join(' ')
    }

    return (
        <button className={getButtonType()} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button