import { UserManager, WebStorageStateStore, Log } from "oidc-client";
import { IDENTITY_CONFIG, METADATA_OIDC } from "../config/AuthConst";

export default class AuthService {

    private UserManager: UserManager;

    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC
            }
        });

        Log.logger = console;
        Log.level = Log.DEBUG;
        
        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("/auth/callback") !== -1) {
                this.navigateToScreen();
            }
        });

        this.UserManager.events.addSilentRenewError((e) => {
            console.log("Silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("Token expired");
            this.signInSilent();
        });
    }

    signInRedirectCallback = async () => {
        return await this.UserManager.signinRedirectCallback()
    }

    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    signInRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };

    navigateToScreen = () => {
        window.location.replace("/dashboard");
    };

    isAuthenticated = () => {
        console.log('Checking authenticated')

        const oidcData = sessionStorage.getItem('oidc.user:http://localhost:8080/auth/realms/ledahl:recieppy-web')
        var oidcStorage

        if (oidcData) {
            oidcStorage = JSON.parse(oidcData)
        }

        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    signInSilent = () => {
        this.UserManager.signinSilent()
            .then((user) => {
                console.log("signed in", user);
            })
            .catch((err) => {
                sessionStorage.removeItem(`oidc.user:http://localhost:8080/auth/realms/ledahl:recieppy-web`)
                console.log('Error during silent sign in: ' + err);
            });
    };
    
    signInSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSignInRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
    };

    signOutRedirectCallback = () => {
        this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace('http://localhost:3000/');
        });
        this.UserManager.clearStaleState();
    };
}