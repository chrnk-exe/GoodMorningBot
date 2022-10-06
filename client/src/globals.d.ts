declare module '*.css'
declare module '*.scss';

declare interface User {
    name: string | null
    avatarURL: string | null
    userID: number
    vkID: number
    Role: Roles
    activated: boolean
    vkNAME?: string
}

declare interface ILoginRequest {
    login: string;
    password: string;
}

declare interface ILoginResponse {
    auth: boolean
    info: string
    id: number
    email: string
    vklink: string
    last_vizit: Date
    added_videos: number
    isAdmin: boolean
    activated: boolean
    token: string
}

declare enum Roles {
    slave,
    user,
    admin
}

declare interface IVideos {
    vkcontent: string
}

declare interface IVideoState {
    all: IVideos[],
    user: IVideos[]
}

// declare interface LoginResponse extends RegistrationResponse {
//     user_vkid: number
//     user_vk_avatar: number
// }
