'use strict'
import axios from 'axios'
import { gameData } from '../data/game.data';
import IGame from '../interface/IGame.interfacets';
import IRound from '../interface/IRound.interface';
import IUser from '../interface/IUser.interfacets';
import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { localStorageService } from './storageService';
import { userService } from './user.service';
import { utilService } from './util.service';

export const gameService = {
    getGame,
    getLastGames,
    createNewGame,
    finishGame,
    addUserToGame,
    updateGame,
    finishRound,
    startNextRound
}

const GAME_DB: string = 'gameDB'; // FOR DEVELOPING REASONS

async function getGame(gameId: string): Promise<any> {
    return httpService.get(`game/${gameId}`)
    // const game = await storageService.get(gameId, GAME_DB)
    // return game
}

async function getLastGames(status: string): Promise<IGame> {
    return httpService.get('game', { status })
}

async function createNewGame(user: IUser) {
    const newGame: IGame = _getNewGame(user)
    return updateGame(newGame)
    // const res = await storageService.post(newGame, GAME_DB)
    // return res
}

async function finishGame(game: IGame) {
    const finishedGame: IGame = _getFinishedGame(game)
    await userService.updateUsersPoints(game)
    return updateGame(finishedGame)
}

async function addUserToGame(game: IGame, user: IUser) {
    const updatedGame: IGame = _addUserToGame(game, user)
    return updateGame(updatedGame)
    // const res = await storageService.post(game, GAME_DB)
    // return res
}

async function updateGame(game: IGame): Promise<any> {
    return httpService.post(`game/`, { game })
    // return httpService.post(`game/${game._id}`, { game })

    // const game = await storageService.put(newGame, GAME_DB)
    // return game
}

async function finishRound(game: IGame, roundIdx: number, isVictory: boolean) {
    game = _updatePoints(game, roundIdx, isVictory)
    const newRound = _getNewRound(game, roundIdx)
    game.rounds.push(newRound)
    return updateGame(game)
    // const newGame = await storageService.put(game, GAME_DB)
    // return newGame
}

async function startNextRound(game: IGame, roundIdx: number, level: string, guessingWord: string) {
    game.rounds[roundIdx].guessingWord = guessingWord
    game.rounds[roundIdx].level = _getLevelPoints(level)
    game.status = 'draw-guess'
    return updateGame(game)
    // const newGame = await storageService.put(game, GAME_DB)
    // return newGame
}

function _getNewGame(user: IUser): IGame {
    user.points = 0
    return {
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
                userDrawingId: user._id as string
            },
        ]
    }
}

function _getFinishedGame(game: IGame) {
    game.status = 'finish'
    return game
}

function _addUserToGame(game: IGame, user: IUser) {
    user.points = 0
    game.user2 = user
    game.status = 'waiting-choose'
    game.rounds[0].userGuessingId = user._id as string
    return game
}

function _getNewRound(game: IGame, roundIdx: number): IRound {
    return {
        guessingWord: '',
        img: '../../assets/imgs/initCanvas.jpg',
        level: 1,
        time: 0,
        userDrawingId: game.rounds[roundIdx].userGuessingId, // Switch user positions
        userGuessingId: game.rounds[roundIdx].userDrawingId // Switch user positions
    }
}

function _updatePoints(game: IGame, roundIdx: number, isVictory: boolean) {
    game.status = 'waiting-choose'
    if (!isVictory) return game
    const currGame: IRound = game.rounds[roundIdx]
    const points: number = currGame.level
    if (currGame.userGuessingId === game.user1?._id) game.user1.points += points
    else game.user2 ? (game.user2.points += points) : (game.user2 = game.user2) // Typescript Error :(
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


