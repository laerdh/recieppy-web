import React, { useState, useContext } from 'react';
import './NavigationBar.css';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const NavigationBar = () => {
    const authContext = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)
    const getClass = (): string => {
        const itemClass = ['item']

        if (toggle) {
            itemClass.push('expanded')
        }

        return itemClass.join(' ')
    }

    const handleToggleButtonClicked = () => {
        setToggle(!toggle)
    }

    return (
        <nav>
            <ul className="menu">
                <li className="logo">
                    <div className="brand-container">
                        <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4461 6C11.0532 6 10.7347 6.31858 10.7347 6.71159V35C10.7347 35 15.4316 34.8978 15.5135 15.2542C15.5146 14.9661 15.2819 14.7312 14.9938 14.7312H13.8203C13.334 14.7312 12.9515 14.3153 12.9918 13.8305L13.5799 6.77063C13.6145 6.3559 13.2872 6 12.8711 6H11.4461ZM12.6046 6.65902C12.6046 6.48669 12.7442 6.34692 12.9163 6.34692C13.0884 6.34692 13.2279 6.48669 13.2279 6.65902C13.2279 6.83156 13.0884 6.97133 12.9163 6.97133C12.7442 6.97133 12.6046 6.83156 12.6046 6.65902ZM14.5322 8.15079L14.1313 12.9641C14.0912 13.4451 14.4708 13.8578 14.9535 13.8578H16.1303C16.418 13.8578 16.6503 14.0923 16.6492 14.3799C16.6313 18.6684 16.393 22.0236 16.0315 24.649H18.4416L23.1857 31.8087H30.2654L23.7102 22.0495C23.7102 22.0495 21.8592 22.3576 20.9927 20.8817L18.0626 15.7163C17.9958 15.5986 18.031 15.4493 18.1433 15.3737L18.159 15.3633C18.2777 15.2835 18.4384 15.315 18.5181 15.4337L21.6715 20.1286C21.7397 20.2298 21.8742 20.2731 21.9816 20.2155C22.1053 20.1493 22.1419 19.9932 22.0657 19.8799L18.9049 15.1739C18.8202 15.0478 18.861 14.8743 18.9983 14.8009C19.1176 14.7368 19.2672 14.785 19.3427 14.8974L22.4954 19.591C22.5671 19.6979 22.7118 19.7264 22.8187 19.6545L22.8401 19.6401L22.8616 19.6255C22.9684 19.5538 22.9968 19.4091 22.9251 19.3023L19.7724 14.6087C19.6968 14.4962 19.709 14.3394 19.8133 14.2531C19.9332 14.1538 20.1092 14.1817 20.1938 14.3077L23.3474 19.0026C23.4153 19.1037 23.55 19.147 23.6574 19.0895C23.7808 19.0232 23.8176 18.8671 23.7414 18.7537L20.5805 14.0478C20.5008 13.9292 20.5324 13.7682 20.651 13.6886L20.6666 13.678C20.7789 13.6026 20.9305 13.6264 21.0143 13.7328L24.6877 18.3984C25.7262 19.759 24.7412 21.3564 24.7412 21.3564L26.0923 23.368C28.3975 21.9054 29.9286 19.3325 29.9286 16.4V16.3999C29.9286 11.844 26.2363 8.15079 21.6815 8.15079H14.5322Z" fill="#333333"/>
                        </svg>
                        <h1 id="brandname">Reciappy</h1>
                    </div>
                </li>

                <li className={getClass()}><NavLink to="/" activeClassName="active"><b>Hjem</b></NavLink></li>
                <li className={getClass()}><NavLink to="/customers" activeClassName="active"><b>Kunder</b></NavLink></li>
                <li className={getClass()}><NavLink to="/about" activeClassName="active"><b>Om oss</b></NavLink></li>
                <li className={getClass()}><NavLink to="/contact" activeClassName="active"><b>Kontakt</b></NavLink></li>
                { authContext.isAuthenticated() &&
                    <li className={getClass()}><a href="#" onClick={authContext.beginLogout}><b>Logg ut</b></a></li>
                }
                <li onClick={handleToggleButtonClicked} className="toggle"><MenuIcon /></li>
            </ul>
        </nav>
    )
}

export default NavigationBar