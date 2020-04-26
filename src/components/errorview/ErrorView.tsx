import React, { FunctionComponent } from "react"
import './ErrorView.css'
import WarningIcon from '@material-ui/icons/WarningRounded'


interface ErrorViewProps {
    message?: string
}

const ErrorView: FunctionComponent<ErrorViewProps> = ({ message, children }) => {
    return (
        <div className="error-container">
            <WarningIcon fontSize="large" style={{ fontSize: '5em', color: 'orange' }} />
            { message &&
                <h1>{message}</h1>
            }
            { children }
        </div>
    )
}

export default ErrorView