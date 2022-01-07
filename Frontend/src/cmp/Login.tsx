import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IUser from '../interface/IUser.interfacets';
import { eventBusService } from '../services/event-bus.service';
import { userService } from '../services/user.service'
import { RootState } from '../store';
import { addUserToGame, createNewGame } from '../store/actions/gameActions';
import { onLogin } from '../store/actions/userActions';
import { GameState } from '../store/reducers/gameReducer';
import { Loading } from './Loading';
import { UserList } from './UserList';

export const Login = ({ historyPush }: any) => {

    const dispatch = useDispatch()
    const { game }: GameState = useSelector((state: RootState) => state.gameModule)
    const [users, setUsers] = useState<null | IUser[]>(null);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const usersToShow: IUser[] = await userService.getUsers()
        console.log('users from backend', usersToShow)
        setUsers(usersToShow)
    }

    const onStart = async () => {
        try {
            await dispatch(onLogin(selectedUser?._id as string))
            if (!game) {
                await dispatch(createNewGame(selectedUser as IUser, historyPush))
            } else {
                await dispatch(addUserToGame(game, selectedUser as IUser))
                historyPush(`waiting-choose`)
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
