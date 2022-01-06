import { useEffect, useState } from "react";
import { Loading } from "../cmp/Loading";
import { Login } from "../cmp/Login";
import { UserList } from "../cmp/UserList";
import IUser from "../interface/IUser.interfacets";
import { userService } from "../services/user.service";

export const StartNewGame = ({ history }: any) => {

    const [users, setUsers] = useState<null | IUser[]>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const usersToShow = await userService.getUsers()
        setUsers(usersToShow)
    }

    const historyPush = (route: string): void => {
        history.push(route)
    }

    if (!users) return <Loading />

    return (
        <section className="start-new-game">
            <Login historyPush={historyPush} />
            {/* <h1>Start new game</h1>
            {selectedUser ? <button onClick={onStart}>Start!</button> : <></>}
            <h1>Choose player: {selectedUser?.username}</h1>
            <UserList users={users} setSelectedUser={setSelectedUser} /> */}
        </section>
    )
}
