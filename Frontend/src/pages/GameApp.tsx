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
import { finishGame, loadGame } from '../store/actions/gameActions'
import { WaitingChoose } from './WaitingChoose';
import { onLogin, onLogout } from '../store/actions/userActions';
import { InviteLogin } from './InviteLogin';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import { socketService } from '../services/socket.service';
import { eventBusService } from '../services/event-bus.service';
import IGame from '../interface/IGame.interfacets';

export const GameApp = ({ match, history }: any) => {

    const dispatch = useDispatch()
    const { game }: GameState = useSelector((state: RootState) => state.gameModule)

    useEffect(() => {
        const { gameId } = match.params;
        dispatch(loadGame(gameId))
        socketService.setup();
        socketService.emit('gameId', gameId)
        socketService.on('draw-updated', () => {
            dispatch(loadGame(gameId))
        })
        socketService.on('route-changed', (route: string) => {
            dispatch(loadGame(gameId))
            history.push(`./${route}`)
            utilService.showUpdateMassage(route)
        })
        socketService.on('game-finished', () => {
            quitGame()
        })
        return () => {
            socketService.off('gameId')
            socketService.off('draw-updated')
            socketService.off('route-changed')
            socketService.off('game-finished')
        }
    }, [])

    const historyPush = (route: string): void => {
        history.push(`./${route}`)
    }

    const onFinishGame = async () => {
        try {
            await dispatch(finishGame(game as IGame))
            quitGame()
        } catch (err) {
            console.log('cannot finish game', err)
            eventBusService.showErrorMsg('Cannot finish game!')
        }
    }

    const quitGame = (): void => {
        dispatch(onLogout())
        eventBusService.showSuccessMsg('Game finished!')
        history.push('')
    }

    if (!game) return <Loading />

    return (
        <section className="game-app flex direction-col">
            <button onClick={onFinishGame} className="btn-finish-game" >Finish Game</button>
            <GameSummary game={game} />
            <Route exact path="/game/:gameId/draw-guess" render={() => <DrawGuess historyPush={historyPush} />} />
            <Route exact path="/game/:gameId/waiting-choose" render={() => <WaitingChoose historyPush={historyPush} />} />
            <Route exact path="/game/:gameId/invite-login" render={() => <InviteLogin historyPush={historyPush} />} />
        </section>
    )
}
