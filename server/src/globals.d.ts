declare module 'path';

declare interface ILoginRequest {
    login: string
    password: string
}

declare interface IRegisterRequest {
    email: string
    password: string
}

declare enum loginErrors {
    INCORRECT_PASSWORD,
    USER_DOESNT_EXIST,
    DUPLICATE_USER
}

declare enum dayOfTheWeek {
    all,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

declare enum Roles {
    slave,
    user,
    admin
}

declare interface IToken {
    Role: number,
    email: string,
    vk: boolean,
    uid: number,
    // iat: number,
    // exp: number
}