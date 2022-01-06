import React from 'react'
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { Invite } from '../cmp/Invite';
import { Login } from '../cmp/Login';
import { Loading } from '../cmp/Loading';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { UserState } from '../store/reducers/userReducer';
import IGame from '../interface/IGame.interfacets';
import IUser from '../interface/IUser.interfacets';

export const InviteLogin = ({ history }: any) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    // if (!loggedinUser) return <Loading />

    return (
        <section className="init-login">
            <section className="draw-guess">
                {userService.IsDrawing(game as IGame, roundIdx, loggedinUser as IUser) ? <Invite /> : <Login historyPush={historyPush} />}
            </section>
        </section>
    )
}
