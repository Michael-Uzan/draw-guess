import React, { useEffect, useState } from 'react'
import { Draw } from '../cmp/Draw'
import { Guess } from '../cmp/Guess';
import { Loading } from '../cmp/Loading';
import IUser from '../interface/IUser.interfacets';
import { gameService } from '../services/game.service';
import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';

export const DrawGuess = ({ match }: any) => {

    // const dispatch = useDispatch()
    const { game, roundIdx } = useSelector(state => state.gameModule)

    const [loggedinUser, setLoggedinUser] = useState<IUser | null>(null);

    useEffect(() => {
        const loggedinUser = userService.getLoggedinUser()
        setLoggedinUser(loggedinUser)
    }, [])

    const getIsDrawing = () => {
        return (game.rounds[roundIdx].userDrawingId === loggedinUser?._id)
    }

    if (!loggedinUser || !game) return <Loading />

    return (
        <section className="draw-guess">
            {!getIsDrawing() ? <Draw /> : <Guess />}
        </section>
    )
}
