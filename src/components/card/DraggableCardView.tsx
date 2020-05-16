import './CardView.css'
import React from 'react'
import Overlay from './Overlay'
import ExternalLink from '../../assets/images/external_link.svg'
import { CardViewType } from './CardView'
import CardViewUtil from './CardViewUtil'

export interface DraggableCardViewProps {
    type: CardViewType
    title: string
    description?: string
    url: string
    imageUrl?: string
    onDragStart: (event: React.DragEvent) => void
}

const DraggableCardView = (props: DraggableCardViewProps) => {    
    return (
        <div
            className={CardViewUtil.cardClass(props.type)}
            style={{ backgroundImage: `url("${props.imageUrl}")`}}
            onDragStart={(event: React.DragEvent) => props.onDragStart(event)}
            draggable>
                <div className="open-external" onClick={() => window.open(props.url, '_blank')}>
                    <img src={ExternalLink} alt="Ekstern lenke" />
                </div>
                <Overlay title={props.title} description={props.description} />
        </div>
    )
}

export default DraggableCardView