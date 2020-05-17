import React from 'react'
import styles from './Backdrop.module.css'

export interface BackdropProps {
    clicked: () => void
}

const Backdrop = (props: BackdropProps) => {
    return (
        <div className={styles.backdrop} onClick={() => props.clicked()}></div>
    )
}

export default Backdrop