import React, { useState } from 'react';
import './emptyitem.css';
import RoundedButton from '../roundedbutton/roundedbutton';

const EmptyItem = (props) => {
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
    );
}

export default EmptyItem;