'use strict'
import axios from 'axios'
import { gameData } from '../data/game.data';
import IGame from '../interface/IGame.interfacets';
import IRound from '../interface/IRound.interface';
import { storageService } from './async-storage.service';
import { localStorageService } from './storageService';

export const gameService = {
    getGame,
    updateGame,
    finishRound
}

const GAME_DB: string = 'gameDB';

async function getGame(gameId: string): Promise<any> {
    // INITALIZE:
    // const game = gameData
    // localStorageService.save(GAME_DB, game)

    const game = await storageService.get(gameId, GAME_DB)
    return game
}

async function updateGame(newGame: IGame): Promise<any> {
    const game = await storageService.put(newGame, GAME_DB)
    return game
}

async function finishRound(game: IGame, roundIdx: number) {
    const newRound = _getNewRound(game, roundIdx)
    game.rounds.push(newRound)
    game.status = 'waiting'
    const newGame = await storageService.put(game, GAME_DB)
    return newGame
}

function _getNewRound(game: IGame, roundIdx: number): IRound {
    return {
        guessingWord: 'cat',
        img: '',
        level: 1,
        time: 0,
        userDrawingId: game.rounds[roundIdx].userGuessingId, // Switch user positions
        userGuessingId: game.rounds[roundIdx].userDrawingId // Switch user positions
    }
}


