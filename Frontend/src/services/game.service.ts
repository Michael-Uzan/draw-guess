'use strict'
import axios from 'axios'
import { storageService } from './async-storage.service';
import { localStorageService } from './storageService';

export const gameService = {
    getGame
}

// const POKEMON_QUANTITY: number = 3;
const GAME_DB: string = 'gameDB';

async function getGame(): Promise<any> { //Promise<IPokemon[]>
    const game = await storageService.query(GAME_DB)
    return game
}




