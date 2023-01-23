import React, { useState } from 'react';
import './EmptyItem.css';
import AddIcon from '../../assets/images/add.svg'

export interface EmptyItemProps {
    dayOfWeek: string
    showAddRecipeModal: () => void
}

const EmptyItem = (props: EmptyItemProps) => {
    const [itemOnTop, setItemOnTop] = useState(false)

    function handleItemOnTop() {
        setItemOnTop(!itemOnTop)
    }

    return (
        <div 
            className={itemOnTop ? 'empty-item droppable-entered' : 'empty-item'}
            onDragEnter={() => handleItemOnTop()} 
            onDragLeave={() => handleItemOnTop()}
            >
            <img id="add-item" src={AddIcon} alt="Legg til" onClick={props.showAddRecipeModal} />
            <p>{ props.dayOfWeek }</p>
        </div>
    )
}

export default EmptyItem