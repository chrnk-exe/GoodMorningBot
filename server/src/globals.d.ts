declare interface LoginRequest {
    headers?: object
    data: LoginData
}

declare interface LoginData {
    login: string
    password: string
}

declare enum loginErrors {
    INCORRECT_PASSWORD,
    USER_DOESNT_EXIST,
    DUPLICATE_USER
}

declare module 'path';