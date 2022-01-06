import React, { useEffect, useState } from 'react'
import { Draw } from '../cmp/Draw'
import { Guess } from '../cmp/Guess';
import { Loading } from '../cmp/Loading';
import IUser from '../interface/IUser.interfacets';
import { gameService } from '../services/game.service';
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { UserState } from '../store/reducers/userReducer';
import IGame from '../interface/IGame.interfacets';

export const DrawGuess = ({ match, history }: any) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    return (
        <section className="draw-guess">
            {userService.IsDrawing(game as IGame, roundIdx, loggedinUser as IUser) ? <Draw /> : <Guess historyPush={historyPush} />}
        </section>
    )
}
