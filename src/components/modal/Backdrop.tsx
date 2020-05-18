import React from 'react'
import styles from './Backdrop.module.css'

export interface BackdropProps {
    style?: React.CSSProperties
    clicked: () => void
}

const Backdrop = ({ style, clicked }: BackdropProps) => {
    return (
        <div className={styles.backdrop} style={style} onClick={() => clicked()}></div>
    )
}

export default Backdrop