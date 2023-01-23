import React, { useEffect } from 'react';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
import { IDENTITY_CONFIG, METADATA_OIDC } from '../config/AuthConst';

export type AuthenticationAction =
    | { type: 'SetLoading', isLoading: boolean, message?: string }
    | { type: 'SetUserSignedIn', user?: User }
    | { type: 'SetUserSignedOut' }
    | { type: 'SetUserExpired' }

export interface ViewState {
    isLoading: boolean
    message?: string
}

export interface AuthenticationState {
    user?: User
    viewState: ViewState
    isAuthenticated: () => boolean
    beginAuthentication: () => void
    beginLogout: () => void
    completeAuthentication: () => void
    completeSilentAuthentication: () => void
    completeLogout: () => void
}

const initialState: AuthenticationState = {
    user: undefined,
    viewState: { isLoading: true },
    isAuthenticated: () => false,
    beginAuthentication: () => {},
    beginLogout: () => {},
    completeAuthentication: () => {},
    completeSilentAuthentication: () => {},
    completeLogout: () => {}
}

function reducer(state: AuthenticationState, action: AuthenticationAction): AuthenticationState {
    switch (action.type) {
        case 'SetLoading':
            return {
                ...state,
                viewState: { isLoading: action.isLoading, message: action.message }
            }
        case 'SetUserSignedIn':
            return {
                ...state,
                user: action.user,
                viewState: { isLoading: false }
            }
        case 'SetUserExpired':
        case 'SetUserSignedOut':
            return {
                ...state,
                user: undefined,
                viewState: { isLoading: false }
            }
        default:
            return state
    }
}

export const AuthContext = React.createContext<AuthenticationState>(initialState);

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const [userManager] = React.useState(new UserManager({
        ...IDENTITY_CONFIG,
        userStore: new WebStorageStateStore({ store: window.sessionStorage }),
        metadata: {
            ...METADATA_OIDC
        }
    }))
    
    useEffect(() => {
        
        // Callback functions

        const userLoaded = (user: User): void => {
            dispatch({ type: 'SetUserSignedIn', user: user })
        }
    
        const userRemoved = (): void => {
            dispatch({ type: 'SetUserExpired' })
        }
    
        const userSignedOut = (): void => {
            dispatch({ type: 'SetUserSignedOut' })
        }
    
        const tokenExpired = (...ev: any[]): void => {
            if (!state.user) { return }

            userManager.signinSilent().then(user => {
                if (user && !user.expired) {
                    dispatch({ type: 'SetUserSignedIn', user: user })
                } else {
                    dispatch({ type: 'SetUserExpired' })
                }
            }).catch(e => {
                console.log('Error during silent sign in', e)
                dispatch({ type: 'SetUserExpired' })
            })
        }
    
        const silentRenewError = (error: Error): void => {
            dispatch({ type: 'SetUserExpired' })
        }

        userManager.events.addUserLoaded(userLoaded)
        userManager.events.addUserUnloaded(userRemoved)
        userManager.events.addAccessTokenExpired(tokenExpired)
        userManager.events.addSilentRenewError(silentRenewError)
        userManager.events.addUserSignedOut(userSignedOut)

        userManager.getUser().then(user => {
            if (user) {
                dispatch({ type: 'SetUserSignedIn', user: user })
            } else {
                dispatch({ type: 'SetUserSignedOut' })
            }
        })

        return () => {
            userManager.events.removeUserLoaded(userLoaded)
            userManager.events.removeUserUnloaded(userRemoved)
            userManager.events.removeAccessTokenExpired(tokenExpired)
            userManager.events.removeSilentRenewError(silentRenewError)
            userManager.events.removeUserSignedOut(userSignedOut)
        }
    }, [userManager])

    // Authentication functions

    const isAuthenticated = (): boolean => {
        return !!state.user && !!state.user.profile && !state.user.expired
    }

    const beginAuthentication = () => {
        userManager.signinRedirect()
    }

    const completeAuthentication = () => {
        userManager.signinRedirectCallback().then(user => {
            dispatch({ type: 'SetUserSignedIn', user: user })

            if (window.location.href.includes("/auth/callback")) {
                navigateToHomeScreen()
            }
            
        }).catch(e => {
            console.log('Error in sign in callback', e)
        })
    }

    const completeSilentAuthentication = () => {
        userManager.signinSilentCallback().then(user => {
            dispatch({ type: 'SetUserSignedIn', user: user })
        }).catch(e => {
            console.log('Error during silent sign in', e)
        })
    }

    const beginLogout = async () => {
        dispatch({ type: 'SetLoading', isLoading: true, message: 'Signing out...' })

        await userManager.signoutRedirect({
            id_token_hint: localStorage.getItem('id_token')
        })
        await userManager.clearStaleState()
    }

    const completeLogout = async () => {
        await userManager.signoutRedirectCallback().then(() => {
            localStorage.clear()
            window.location.replace(document.domain)
            
            dispatch({ type: 'SetUserSignedOut' })
        })
        await userManager.clearStaleState()
    }

    const navigateToHomeScreen = () => {
        window.location.replace('/dashboard')
    }

    return (
        <AuthContext.Provider 
            value={
                {
                    ...state,
                    isAuthenticated: isAuthenticated,
                    beginAuthentication: beginAuthentication,
                    beginLogout: beginLogout,
                    completeAuthentication: completeAuthentication,
                    completeSilentAuthentication: completeSilentAuthentication,
                    completeLogout: completeLogout
                }
            }>
            {props.children}
        </AuthContext.Provider>
    )
}