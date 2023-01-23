import React from "react";
import { AuthConsumer } from "../../context/AuthContext"
import Spinner from "../../components/spinner/Spinner";

export const Logout = () => {
    return (
        <AuthConsumer>
            {({ beginLogout }) => {
                beginLogout()
                return <Spinner message="Signing out..." />
            }}
        </AuthConsumer>
    )
};