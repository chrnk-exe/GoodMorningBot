import { User } from "./models"

export default async (login: string, password: string) => {
    const user = await User.findOne({
        where: {
            email: login,
            password: password
        }
    })
    if(user === null){
        return user
    } else {
        return user
    }
}
