declare interface LoginRequest {
    login: string
    password: string
}

declare enum loginErrors {
    INCORRECT_PASSWORD,
    USER_DOESNT_EXIST,
    DUPLICATE_USER
}

declare interface TypedRequestBody<T> extends Express.Request { body: T }

declare interface TypedRequestQuery<T extends Express.Request.QueryString.ParsedQs> extends Express.Request { query: T}

declare module 'path';
