import React from 'react';
import './emptyitem.css';
import RoundedButton from '../roundedbutton/roundedbutton';

const EmptyItem = () => {
    return (
        <div className="empty-item">
            <div className="empty-item-content">
                <RoundedButton
                    title={'Legg til måltid'}
                />
            </div>
        </div>
    );
}

export default EmptyItem;