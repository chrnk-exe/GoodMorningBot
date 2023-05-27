declare module '*.css'
declare module '*.scss';

declare interface User {
    userID: number
    Role: Roles
    email?: string
    avatarURL?: string 
    userName?: string
	firstName?: string
	secondName?: string
}

declare interface ILoginRequest {
    login: string;
    password: string;
}

/**
 * @interface ILoginResponse
 * @type ILoginResponse
 */
declare interface ILoginResponse {
    auth: boolean
    info: string
    
    id: number //user id
    email: string
    vklink: string
    last_vizit: Date
    added_videos: number
    avatarURL?: string

    isAdmin: boolean
    activated: boolean
    token: string

    clientKey: string
    access_key?: string
    access_token?: string
}



declare enum Roles {
    slave,
    user,
    admin
}

declare interface IVideosResponse {
    response: {data: string, day: 0 | 1 | 2 | 3 | 4 | 5 | 6}[]
    length: number
}


declare interface BaseQueryApi {
    getState: () => unknown
    extra: unknown
    endpoint: string
    type: 'query' | 'mutation'
    forced: boolean | undefined
}
declare interface IVideoState {
    all: IVideos[],
    user: IVideos[]
}


// declare interface LoginResponse extends RegistrationResponse {
//     user_vkid: number
//     user_vk_avatar: number
// }
