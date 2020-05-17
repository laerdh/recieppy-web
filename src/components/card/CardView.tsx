import React, { FunctionComponent } from 'react'
import Overlay from './Overlay'
import CardViewUtil from './CardViewUtil'

export enum CardViewType {
    Default,
    Small,
    Promo
}

export interface CardViewProps {
    type: CardViewType
    imageUrl?: string
    onClick?: () => void
}

const CardView: FunctionComponent<CardViewProps> = ({ type, imageUrl, onClick, children }) => {
    return (
        <div
            className={CardViewUtil.cardClass(type)}
            style={{ backgroundImage: `url("${imageUrl}")`}}
            onClick={() => onClick?.()}>
                <Overlay style={CardViewUtil.overlayStyle(type)}>
                    { children }
                </Overlay>
        </div>
    )
}

export default CardView