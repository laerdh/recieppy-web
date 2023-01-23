import React, { useState, FunctionComponent } from 'react'
import styles from './CardView.module.css'
import Overlay from './Overlay'
import { CardViewType } from './CardView'
import CardViewUtil from './CardViewUtil'

export interface DraggableCardViewProps {
    type: CardViewType
    title: string
    description?: string
    imageUrl?: string
    onDragStart: (event: React.DragEvent) => void
}

const DraggableCardView: FunctionComponent<DraggableCardViewProps> = ({ type, title, description, imageUrl, onDragStart, children }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    
    function toggleMenu() {
        setIsMenuVisible(!isMenuVisible)
    }

    return (
        <div
            className={CardViewUtil.cardClass(type)}
            style={{ backgroundImage: `url("${imageUrl}")`}}
            onDragStart={(event: React.DragEvent) => onDragStart(event)}
            draggable>
                { children }
                <Overlay style={{ flex: '1 1 initial', padding: 16 }}>
                    <h3 className={styles.overlayTitle}>{title}</h3>
                    <p className={styles.overlayDescription}>{description}</p>
                </Overlay>
        </div>
    )
}

export default DraggableCardView