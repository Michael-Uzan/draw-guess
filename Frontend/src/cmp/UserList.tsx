import IUser from "../interface/IUser.interfacets"
import { UserPreview } from "./UserPreview"

interface PropType {
    users: IUser[],
    setSelectedUser: Function
}

export const UserList = ({ users, setSelectedUser }: PropType) => {
    return (
        <section className="user-list">
            {users.map((user: IUser) => (<UserPreview key={user._id} user={user} setSelectedUser={setSelectedUser} />))}
        </section>
    )
}
