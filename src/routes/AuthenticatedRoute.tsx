import React from "react";
import { AuthConsumer } from "../context/AuthContext"
import { Route, RouteProps } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";


export const AuthenticatedRoute = ({ component, ...rest }: RouteProps) => {
    const renderFn = (Component?: React.ComponentType<any>) => (props: any) => {
        return (
            <AuthConsumer>
                {({ beginAuthentication, viewState, isAuthenticated }) => {

                    if (viewState.isLoading) {
                        return <Spinner message={viewState.message} />
                    }

                    if (!!Component && isAuthenticated()) {
                        return <Component {...props} />;
                    } else {
                        beginAuthentication()
                        return <Spinner />
                    }

                }}
            </AuthConsumer>
        )
    }

    return <Route {...rest} render={renderFn(component)} />;
};