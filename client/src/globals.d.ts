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
    
    id: number //user id
    email: string
    vklink: string
    last_vizit: Date
    added_videos: number

    isAdmin: boolean
    activated: boolean
    token: string

    clientKey: string
    access_key?: string
}

declare enum Roles {
    slave,
    user,
    admin
}

declare interface IVideos {
    id: number
    vkcontent: string
    day: number
    content?: ArrayBuffer 
}

declare interface IVideoState {
    all: IVideos[],
    user: IVideos[]
}

// declare interface LoginResponse extends RegistrationResponse {
//     user_vkid: number
//     user_vk_avatar: number
// }
