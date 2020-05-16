import React from 'react'
import './Overlay.css'

export interface OverlayProps {
    title: string
    description?: string
}

const Overlay = (props: OverlayProps) => {
    return (
        <div className="card-overlay">
            <div className="card-overlay-content">
                <h3 className="content title">{props.title}</h3>
                <p className="content description">{props.description}</p>
            </div>
        </div>
    )
}

export default Overlay