export const IDENTITY_CONFIG = {
    authority: 'http://localhost:8080/auth/realms/ledahl',
    client_id: 'recieppy-web',
    redirect_uri: 'http://localhost:3000/auth/callback',
    loadUserInfo: false,
    silent_redirect_uri: 'http://localhost:3000/auth/renew',
    response_type: 'code',
    scope: 'openid',
    webAuthResponseType: 'id_token token'
};

export const METADATA_OIDC = {
    issuer: 'http://localhost:8080/auth/realms/ledahl',
    jwks_uri: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/certs',
    authorization_endpoint: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/auth',
    token_endpoint: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/token',
    userinfo_endpoint: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/userinfo',
    end_session_endpoint: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/logout',
    check_session_iframe: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/login-status-iframe.html',
    introspection_endpoint: 'http://localhost:8080/auth/realms/ledahl/protocol/openid-connect/token/introspect'
};  