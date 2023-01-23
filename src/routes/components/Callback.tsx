import React from "react";
import { AuthConsumer } from "../../context/AuthContext"
import Spinner from "../../components/spinner/Spinner";

export const Callback = () => {
    return (
        <AuthConsumer>
            {({ completeAuthentication }) => {
                completeAuthentication()
                return <Spinner message="Signing in..." />
            }}
        </AuthConsumer>
    )
}