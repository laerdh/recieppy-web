import React, { FunctionComponent } from 'react'
import styles from './DropdownMenuItem.module.css'

export interface DropdownMenuItemProps {
    title: string
    onClick: () => void
}

const DropdownMenuItem: FunctionComponent<DropdownMenuItemProps> = ({ title, onClick, children }) => {
    return (
        <div className={styles.dropdownMenuItem} onClick={onClick}>
            { children }
            <span style={{ padding: '0 8px 0 8px' }}>{title}</span>
        </div>
    )
}

export default DropdownMenuItem