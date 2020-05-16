import './CardView.css'
import React from 'react'
import Overlay from './Overlay'
import CardViewUtil from './CardViewUtil'

export enum CardViewType {
    Default,
    Promo
}

export interface CardViewProps {
    type: CardViewType
    title: string
    description: string
    imageUrl?: string
}

const CardView = (props: CardViewProps) => {
    return (
        <div
            className={CardViewUtil.cardClass(props.type)}
            style={{ backgroundImage: "url(" + props.imageUrl + ")"}}>
                <Overlay title={props.title} description={props.description} />
        </div>
    )
}

export default CardView