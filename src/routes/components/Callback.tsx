import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider"

export const Callback = () => {
    return (
        <AuthConsumer>
            {({ signInRedirectCallback }) => {
                console.log("CALLBACK")
                signInRedirectCallback()
                return <span>loading</span>
            }}
        </AuthConsumer>
    )
}