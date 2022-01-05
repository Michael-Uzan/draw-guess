import React, { useEffect, useState } from 'react'
import { Draw } from '../cmp/Draw'
import { Guess } from '../cmp/Guess';
import { Loading } from '../cmp/Loading';
import IUser from '../interface/IUser.interfacets';
import { gameService } from '../services/game.service';
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';

export const DrawGuess = ({ match, history }: any) => {

    const { game, roundIdx } = useSelector(state => state.gameModule)
    const { loggedinUser } = useSelector(state => state.userModule)

    const historyPush = (route: string): void => {
        history.push(route)
    }

    return (
        <section className="draw-guess">
            {userService.IsDrawing(game, roundIdx, loggedinUser) ? <Draw /> : <Guess historyPush={historyPush} />}
        </section>
    )
}
