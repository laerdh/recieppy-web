import * as React from "react";
import { Callback } from "./components/Callback";
import { Logout } from "./components/Logout";
import { LogoutCallback } from "./components/LogoutCallback";
import { SilentRenew } from "./components/SilentRenew";
import { AuthenticatedRoute } from "./AuthenticatedRoute";
import { Dashboard } from "../components/dashboard/Dashboard";
import { SignIn } from "../components/sign-in/SignIn";
import { Switch, Route } from "react-router-dom";

export const Routes = (
    <Switch>
        <Route exact={true} path="/auth/callback" component={Callback} />
        <Route exact={true} path="/logout" component={Logout} />
        <Route exact={true} path="/logout/callback" component={LogoutCallback} />
        <Route exact={true} path="/auth/renew" component={SilentRenew} />
        <AuthenticatedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={SignIn} />
    </Switch>
)
