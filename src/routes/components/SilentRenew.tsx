import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider"

export const SilentRenew = () => {
    return (
        <AuthConsumer>
            {({ signInSilentCallback }) => {
                signInSilentCallback()
                return <span>loading</span>
            }}
        </AuthConsumer>
    )
};