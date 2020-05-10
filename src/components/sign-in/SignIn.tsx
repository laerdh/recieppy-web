import React from "react";
import './SignIn.css';
import CardView from "../card/CardView";
import Button, { ButtonType } from "../buttons/Button";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

interface SignInProps {}

export const SignIn = (props: SignInProps) => {
    const authContext = React.useContext(AuthContext)

    return (
        <div className="signin-container">
            <div className="promotional">
                <CardView title="Sandans favoritter" description="12 oppskrifter" imageUrl="https://images.matprat.no/gkvvb8uj4j-jumbotron/large" />
                <CardView title="Aslaksens topp 10" description="10 oppskrifter" imageUrl="https://images.matprat.no/bznby7vyka-jumbotron/large" />
            </div>
            <div className="signin">
                <h1 className="signin-title">Reciappy</h1>
                <p className="signin-description">Reciappy lar deg samle<br/>alle favorittoppskriftene<br/>dine på ett sted!</p>
                <div className="divider"></div>

                { authContext.isAuthenticated()
                    ? <div className="buttongroup">
                        <Link to="/dashboard">
                            <Button text="Gå til planleggeren" type={ButtonType.Primary} onClick={() => { console.log('Go to dashboard')}} />
                        </Link>
                     </div>
                    : <div className="buttongroup">
                        <Button text="Logg inn" type={ButtonType.Secondary} onClick={authContext.beginAuthentication} />
                        <Button text="Lag ny bruker" type={ButtonType.Primary} onClick={authContext.beginAuthentication} />
                     </div>
                }
            </div>
        </div>
    );
}