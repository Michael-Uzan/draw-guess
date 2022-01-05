import React, { useEffect, useRef, useState } from 'react'
import { Route } from 'react-router-dom';
import { Draw } from '../cmp/Draw';
import { GameSummary } from '../cmp/GameSummary';
import { Loading } from '../cmp/Loading';
import { userData } from '../data/user.data';
import IPosition from '../interface/IPosition.interface';
import { gameService } from '../services/game.service';
import { localStorageService } from '../services/storageService';
import { userService } from '../services/user.service';
import { utilService } from '../services/util.service';
import { DrawGuess } from './DrawGuess';
import { useDispatch, useSelector } from 'react-redux';
import { loadGame } from '../store/actions/gameActions'

export const GameApp = ({ match }: any) => {

    const dispatch = useDispatch()
    const { game } = useSelector(state => state.gameModule)
    // const [game, setGame] = useState(null);

    useEffect(() => {
        // loadGame()

        // LOGIN //
        userService.login('jrtez72dogg580g')

        const { gameId } = match.params;
        dispatch(loadGame(gameId))
        // const users = userData
        // localStorageService.save('userDB', users)
        return () => {

        }
    }, [])

    // const loadGame = async () => {

    // const game = await gameService.getGame(gameId)
    // setGame(game)
    // }

    if (!game) return <Loading />

    return (
        <section className="game-app">
            <GameSummary game={game} />
            <Route exact component={DrawGuess} path="/game/:gameId/draw-guess" />
        </section>
    )
}
