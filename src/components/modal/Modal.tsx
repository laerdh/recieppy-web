import React, { FunctionComponent } from 'react'
import styles from './Modal.module.css'
import Backdrop from './Backdrop'
const CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup')

export interface ModalProps {
    onModalClicked: () => void
}

const Modal: FunctionComponent<ModalProps> = ({ children, onModalClicked }) => {
    return (
        <CSSTransitionGroup
            transitionName={styles}
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <Backdrop clicked={onModalClicked} />
            <div className={styles.modal}>
                {children}
            </div>
        </CSSTransitionGroup>
    )
}

export default Modal