import React from 'react'
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { Invite } from '../cmp/Invite';
import { Login } from '../cmp/Login';
import { Loading } from '../cmp/Loading';

export const InviteLogin = ({ history }: any) => {

    const { game, roundIdx } = useSelector(state => state.gameModule)
    const { loggedinUser } = useSelector(state => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    // if (!loggedinUser) return <Loading />

    return (
        <section className="init-login">
            <section className="draw-guess">
                {userService.IsDrawing(game, roundIdx, loggedinUser) ? <Invite /> : <Login historyPush={historyPush} />}
            </section>
        </section>
    )
}
