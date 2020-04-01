import React, { useState } from 'react';
import './EmptyItem.css';
import RoundedButton from '../roundedbutton/RoundedButton';

interface EmptyItemProps {}

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
            <div className="empty-item-content">
                <RoundedButton
                    title={'Legg til måltid'}
                />
            </div>
        </div>
    )
}

export default EmptyItem