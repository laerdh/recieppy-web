import React from "react"
import styles from './SignIn.module.css'
import CardView from "../card/CardView"
import Button, { ButtonType } from "../buttons/Button"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { CardViewType } from "../card/CardView"

export const SignIn = () => {
    const authContext = React.useContext(AuthContext)

    return (
        <div className={styles.container}>
            <div className={styles.promotional}>
                <CardView 
                    type={CardViewType.Promo}
                    imageUrl="https://images.matprat.no/gkvvb8uj4j-jumbotron/large">
                        <h3 className={styles.overlayTitle}>Sandans favoritter</h3>
                        <p className={styles.overlayDescription}>12 oppskrifter</p>
                </CardView>
                <CardView
                    type={CardViewType.Promo}
                    imageUrl="https://images.matprat.no/bznby7vyka-jumbotron/large">
                        <h3 className={styles.overlayTitle}>Aslaksens topp 10</h3>
                        <p className={styles.overlayDescription}>10 oppskrifter</p>
                </CardView>
            </div>
            <div className={styles.signin}>
                <h1 className={styles.title}>Reciappy</h1>
                <p className={styles.description}>Reciappy lar deg samle<br/>alle favorittoppskriftene<br/>dine på ett sted!</p>
                <div className="divider"></div>

                { authContext.isAuthenticated()
                    ? <div className={styles.buttonGroup}>
                        <Link to="/dashboard">
                            <Button text="Gå til planleggeren" type={ButtonType.Primary} />
                        </Link>
                     </div>
                    : <div className={styles.buttonGroup}>
                        <Button text="Logg inn" type={ButtonType.Secondary} onClick={authContext.beginAuthentication} />
                        <Button text="Lag ny bruker" type={ButtonType.Primary} onClick={authContext.beginAuthentication} />
                     </div>
                }
            </div>
        </div>
    );
}