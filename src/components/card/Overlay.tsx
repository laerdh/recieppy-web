import React, { FunctionComponent } from 'react'
import styles from './Overlay.module.css'

export interface OverlayProps {
    style: React.CSSProperties
}

const Overlay: FunctionComponent<OverlayProps> = ({ style, children}) => {
    return (
        <div className={styles.baseOverlay} style={style}>
            {children}
        </div>
    )
}

export default Overlay