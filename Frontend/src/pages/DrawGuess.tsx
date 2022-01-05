import React, { useEffect, useState } from 'react'
import { Draw } from '../cmp/Draw'
import { Guess } from '../cmp/Guess';
import { Loading } from '../cmp/Loading';
import IUser from '../interface/IUser.interfacets';
import { gameService } from '../services/game.service';
import { userService } from '../services/user.service'

export const DrawGuess = ({ match }: any) => {

    const [loggedinUser, setLoggedinUser] = useState<IUser | null>(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        const loggedinUser = userService.getLoggedinUser()
        setLoggedinUser(loggedinUser)
        loadGame()
    }, [])

    const loadGame = async () => {
        const { gameId } = match.params;
        const game = await gameService.getGame(gameId)
        setGame(game)
    }

    const getIsDrawing = () => {
        const roundIdx = game.rounds.length - 1
        // console.log('count' , roundCount)
        return (game.rounds[roundIdx].userDrawingId === loggedinUser?._id)
    }



    if (!loggedinUser || !game) return <Loading />

    return (
        <section className="draw-guess">

            {getIsDrawing() ? <Draw /> : <><Guess game={game} /></>}
            {/* {drawing && <img src={drawing} />} */}
        </section>
    )
}
