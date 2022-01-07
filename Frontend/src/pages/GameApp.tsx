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
import { WaitingChoose } from './WaitingChoose';
import { onLogin } from '../store/actions/userActions';
import { InviteLogin } from './InviteLogin';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { socketService } from '../services/socket.service';

export const GameApp = ({ match, history }: any) => {

    const dispatch = useDispatch()
    const { game }: GameState = useSelector((state: RootState) => state.gameModule)

    useEffect(() => {
        const { gameId } = match.params;
        // NOT GAME ID HOME PAGE
        dispatch(loadGame(gameId))
        socketService.setup();
        socketService.emit('gameId', gameId)
        socketService.on('draw-updated', () => {
            dispatch(loadGame(gameId))
        })
        return () => {
            socketService.off('gameId')
            socketService.off('draw-updated')
        }
    }, [])

    // HISTORY PUSH HERE // 

    const historyPush = (route: string): void => {
        history.push(`./${route}`)
    }

    if (!game) return <Loading />

    return (
        <section className="game-app">
            <GameSummary game={game} />
            <Route exact path="/game/:gameId/draw-guess" render={() => <DrawGuess historyPush={historyPush} />} />
            <Route exact path="/game/:gameId/waiting-choose" render={() => <WaitingChoose historyPush={historyPush} />} />
            <Route exact path="/game/:gameId/invite-login" render={() => <InviteLogin historyPush={historyPush} />} />
        </section>
    )
}
