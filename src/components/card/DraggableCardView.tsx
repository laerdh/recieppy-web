import React from 'react'
import styles from './CardView.module.css'
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
                <div className={styles.openExternal} onClick={() => window.open(props.url, '_blank')}>
                    <img src={ExternalLink} alt="Ekstern lenke" />
                </div>
                <Overlay style={{ flex: '1 1 initial', padding: 16 }}>
                    <h3 className={styles.overlayTitle}>{props.title}</h3>
                    <p className={styles.overlayDescription}>{props.description}</p>
                </Overlay>
        </div>
    )
}

export default DraggableCardView