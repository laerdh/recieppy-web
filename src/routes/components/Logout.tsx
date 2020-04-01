import React from "react";
import { AuthConsumer } from "../../providers/AuthProvider"

export const Logout = () => {
    return (
        <AuthConsumer>
            {({ logout }) => {
                logout()
                return <span>loading</span>
            }}
        </AuthConsumer>
    )
};