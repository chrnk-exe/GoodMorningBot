declare module '*.css'
declare module '*.scss';

declare interface User {
    name: string
    avatarURL: string
    userID: number
    vkID: number
}

declare interface AxiosResponse<T = never>  {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: AxiosRequestConfig<T>;
    request?: any;
}

declare interface AxiosRequestConfig<T = any> {
    url?: string;
    method?: Method;
    baseURL?: string;
    data?: T;
    headers?: Record<string, string>;
    params?: any;
}

declare interface LoginResponse {
    auth: boolean
    id: number
    vklink: string
    last_vizit: Date
    added_videos: number
    isAdmin: boolean
    activated: boolean
}

declare interface RegistrationResponse {
    user_id: number
    username: string
    user_rules: number
}
// declare interface LoginResponse extends RegistrationResponse {
//     user_vkid: number
//     user_vk_avatar: number
// }
