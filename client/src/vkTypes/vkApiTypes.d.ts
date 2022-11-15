declare interface GetUserResponse {
    can_access_closed: boolean
    is_closed: boolean
    id: number
    first_name: string
    last_name: string
    nickname: string
    photo_50?: string 
    photo_100?: string
    photo_200?: string
}
