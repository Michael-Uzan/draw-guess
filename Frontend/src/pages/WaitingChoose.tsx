import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChooseWord } from '../cmp/ChooseWord';
import { Waiting } from '../cmp/Waiting';
import IGame from '../interface/IGame.interfacets';
import IUser from '../interface/IUser.interfacets';
import { userService } from '../services/user.service';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { UserState } from '../store/reducers/userReducer';

export const WaitingChoose = ({ history }: any) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    return (
        <section className="waiting-choose">
            {userService.IsDrawing(game as IGame, roundIdx, loggedinUser as IUser) ? <ChooseWord historyPush={historyPush} /> : <Waiting />}
        </section>
    )
}
