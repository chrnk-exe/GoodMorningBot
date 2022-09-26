import { User } from "../db/models/index"

export default async (login: string, password: string) => {
    const user = await User.findOne({
        where: {
            email: login,
            password: password
        },
        raw: true
    })
    return user
}
