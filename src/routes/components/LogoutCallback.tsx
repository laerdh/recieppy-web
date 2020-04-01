import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider"

export const LogoutCallback = () => {
    return (
        <AuthConsumer>
            {({ signOutRedirectCallback }) => {
                signOutRedirectCallback()
                return <span>loading</span>
            }}
        </AuthConsumer>
    )
};