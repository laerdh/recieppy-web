import React from "react";
import { AuthConsumer } from "../providers/AuthProvider"
import { Route, RouteProps } from "react-router-dom";


export const AuthenticatedRoute = ({ component, ...rest }: RouteProps) => {
    const renderFn = (Component?: React.ComponentType<any>) => (props: any) => {
        return (
            <AuthConsumer>
                {({ isAuthenticated, signIn }) => {
                    if (!!Component && isAuthenticated()) {
                        return <Component {...props} />;
                    } else {
                        signIn()
                        return <span>loading</span>;
                    }
                }}
            </AuthConsumer>
        )
    }

    return <Route {...rest} render={renderFn(component)} />;
};