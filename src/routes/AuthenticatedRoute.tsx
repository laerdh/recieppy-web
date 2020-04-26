import React from "react";
import { AuthConsumer } from "../context/AuthContext"
import { Route, RouteProps } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";
import ErrorView from "../components/errorview/ErrorView";
import { Button } from "@material-ui/core";


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
                    }
                    
                    return (
                        <ErrorView message='You have been logged out.'>
                            <Button onClick={beginAuthentication}>Sign in</Button>
                        </ErrorView>
                    )

                }}
            </AuthConsumer>
        )
    }

    return <Route {...rest} render={renderFn(component)} />;
};