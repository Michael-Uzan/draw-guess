import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChooseWord } from '../cmp/ChooseWord';
import { Waiting } from '../cmp/Waiting';
import { userService } from '../services/user.service';

export const WaitingChoose = ({ history }: any) => {

    const { game, roundIdx } = useSelector(state => state.gameModule)
    const { loggedinUser } = useSelector(state => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    return (
        <section className="waiting-choose">
            {!userService.IsDrawing(game, roundIdx, loggedinUser) ? <ChooseWord historyPush={historyPush} /> : <Waiting />}
        </section>
    )
}
