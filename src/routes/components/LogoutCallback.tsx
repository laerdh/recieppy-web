import React from "react";
import { AuthConsumer } from "../../context/AuthContext"
import Spinner from "../../components/spinner/Spinner";

export const LogoutCallback = () => {
    return (
        <AuthConsumer>
            {({ completeLogout }) => {
                completeLogout()
                return <Spinner />
            }}
        </AuthConsumer>
    )
};