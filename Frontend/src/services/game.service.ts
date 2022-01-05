'use strict'
import axios from 'axios'
import { gameData } from '../data/game.data';
import IGame from '../interface/IGame.interfacets';
import { storageService } from './async-storage.service';
import { localStorageService } from './storageService';

export const gameService = {
    getGame,
    updateGame
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




