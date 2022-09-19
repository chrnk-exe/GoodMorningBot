declare module 'path';

declare interface LoginRequest {
    login: string
    password: string
}

declare enum loginErrors {
    INCORRECT_PASSWORD,
    USER_DOESNT_EXIST,
    DUPLICATE_USER
}

