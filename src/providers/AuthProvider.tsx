import React from 'react';
import AuthService from "../services/AuthService";
import { AuthenticationState } from './ApplicationStore';
import { initialState } from './ApplicationStore';
import { User } from 'oidc-client';

type AuthenticationAction =
    | { type: 'UserLoggedIn', user: User }
    | { type: 'UserLoggedOut' }

function reducer(state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
    switch (action.type) {
        case 'UserLoggedIn':
            console.log('User logged in: ' + action.user)
            return {
                ...state,
                user: action.user
            }
        case 'UserLoggedOut':
            return {
                ...state,
                user: undefined
            }
        default:
            return state
    }
}

const AuthContext = React.createContext<AuthenticationState>(initialState.authentication);

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = (props: any) => {
    const [authService] = React.useState(new AuthService())
    const [state, dispatch] = React.useReducer(reducer, initialState.authentication)

    const signInRedirectCallback = () => {
        authService.signInRedirectCallback().then((user) => {
            console.log('SIGN IN REDIRECT CALLBACK')
            dispatch({ type: 'UserLoggedIn', user: user})
        })
    }

    const signOutRedirectCallback = () => {
        authService.signOutRedirectCallback()
        dispatch({ type: 'UserLoggedOut' })
    }

    const isAuthenticated = () => {
        return authService.isAuthenticated()
    }

    return (
        <AuthContext.Provider 
            value={
                {
                    ...state,
                    signIn: authService.signInRedirect,
                    logout: authService.logout,
                    isAuthenticated: isAuthenticated,
                    signInRedirectCallback: signInRedirectCallback,
                    signOutRedirectCallback: signOutRedirectCallback,
                    signInSilentCallback: authService.signInSilentCallback
                }
            }>
                {props.children}
        </AuthContext.Provider>
    )
}