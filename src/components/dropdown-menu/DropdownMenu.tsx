import React, { useState, FunctionComponent } from 'react'
import styles from './DropdownMenu.module.css'
import Backdrop from '../modal/Backdrop'
import { MoreVertRounded } from '@material-ui/icons'

export interface DropDownProps {}

const DropdownMenu: FunctionComponent<DropDownProps> = ({ children }) => {
    const [showMenu, setShowMenu] = useState(false)

    function toggleMenu() {
        setShowMenu(!showMenu)
    }

    return (
        <div className={styles.menuContainer}>
            <div className="dropdown">
                <MoreVertRounded
                    className={styles.menuIcon}
                    style={{ color: 'white', width: 32, height: 32, padding: '8px 4px 4px 4px' }}
                    onClick={() => toggleMenu()} />
                { showMenu &&
                    <div>
                        <div className={styles.dropdownContent}>
                            {children}
                        </div>
                        <Backdrop clicked={() => setShowMenu(!showMenu) }/>
                    </div>
                }
            </div>
        </div>
    )
}

export default DropdownMenu