import IUser from "../interface/IUser.interfacets"
import { Avatar } from "./Avatar"

interface PropType {
    user: IUser,
    setSelectedUser: Function
}

export const UserPreview = ({ user, setSelectedUser }: PropType) => {
    return (
        <section className="user-preview" onClick={() => setSelectedUser(user)}>
            <Avatar user={user} />
        </section>
    )
}
