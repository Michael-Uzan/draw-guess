import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IUser from '../interface/IUser.interfacets';
import { eventBusService } from '../services/event-bus.service';
import { userService } from '../services/user.service'
import { addUserToGame, createNewGame } from '../store/actions/gameActions';
import { onLogin } from '../store/actions/userActions';
import { Loading } from './Loading';
import { UserList } from './UserList';

export const Login = ({ historyPush }: any) => {

    const dispatch = useDispatch()
    const { game } = useSelector(state => state.gameModule)
    const [users, setUsers] = useState<null | IUser[]>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const usersToShow = await userService.getUsers()
        setUsers(usersToShow)
    }

    const onStart = async () => {
        try {
            await dispatch(onLogin(selectedUser._id))
            if (!game) {
                await dispatch(createNewGame(selectedUser, historyPush))
            } else {
                await dispatch(addUserToGame(game, selectedUser))
                historyPush(`/game/${game._id}/waiting-choose`)
            }
            eventBusService.showSuccessMsg('Let\'s start!')
        } catch (err) {
            eventBusService.showErrorMsg('Cant login! Try again!')
            console.log('cant login', err)
        }
    }

    if (!users) return <Loading />

    return (
        <section className="login tac">
            {selectedUser ? <button onClick={onStart}>Start!</button> : <></>}
            <h1>Choose player: {selectedUser?.username}</h1>
            <UserList users={users} setSelectedUser={setSelectedUser} />
        </section>
    )
}
