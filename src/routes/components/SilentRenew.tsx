import React from "react";
import { AuthConsumer } from "../../context/AuthContext";
import Spinner from "../../components/spinner/Spinner";

export const SilentRenew = () => {
    return (
        <AuthConsumer>
            {({ completeSilentAuthentication }) => {
                completeSilentAuthentication()
                return <Spinner />
            }}
        </AuthConsumer>
    )
};