'use strict'
import axios from 'axios'
import { gameData } from '../data/game.data';
import IGame from '../interface/IGame.interfacets';
import IRound from '../interface/IRound.interface';
import IUser from '../interface/IUser.interfacets';
import { storageService } from './async-storage.service';
import { localStorageService } from './storageService';
import { utilService } from './util.service';

export const gameService = {
    getGame,
    createNewGame,
    updateGame,
    finishRound,
    startNextRound
}

const GAME_DB: string = 'gameDB';

async function getGame(gameId: string): Promise<any> {
    // INITALIZE:
    // const game = gameData
    // localStorageService.save(GAME_DB, game)

    const game = await storageService.get(gameId, GAME_DB)
    return game
}

async function createNewGame(user: IUser) {
    const newGame = {
        _id: utilService.makeId(),
        status: 'invite-login',
        user1: user,
        user2: null,
        rounds: [
            {
                img: '',
                guessingWord: '',
                level: 1,
                time: 0,
                userGuessingId: '',
                userDrawingId: user._id
            },
        ]
    }
    const res = await storageService.post(newGame, GAME_DB)
    return res
}

async function updateGame(newGame: IGame): Promise<any> {
    const game = await storageService.put(newGame, GAME_DB)
    return game
}

async function finishRound(game: IGame, roundIdx: number) {
    game = _updatePoints(game, roundIdx)
    const newRound = _getNewRound(game, roundIdx)
    game.rounds.push(newRound)
    game.status = 'waiting'
    const newGame = await storageService.put(game, GAME_DB)
    return newGame
}

async function startNextRound(game: IGame, roundIdx: number, level: string, guessingWord: string) {
    game.rounds[roundIdx].guessingWord = guessingWord
    game.rounds[roundIdx].level = _getLevelPoints(level)
    const newGame = await storageService.put(game, GAME_DB)
    return newGame
}

function _getNewRound(game: IGame, roundIdx: number): IRound {
    return {
        guessingWord: 'cat',
        img: '../../assets/imgs/initCanvas.jpg',
        level: 1,
        time: 0,
        userDrawingId: game.rounds[roundIdx].userGuessingId, // Switch user positions
        userGuessingId: game.rounds[roundIdx].userDrawingId // Switch user positions
    }
}

function _updatePoints(game: IGame, roundIdx: number) {
    const currGame = game.rounds[roundIdx]
    const points = currGame.level
    if (currGame.userGuessingId === game.user1._id) game.user1.points += points
    else game.user2.points += points
    return game
}

function _getLevelPoints(level: string): number {
    switch (level) {
        case 'medium':
            return 3
        case 'hard':
            return 5
        default:
            return 1
    }
}


