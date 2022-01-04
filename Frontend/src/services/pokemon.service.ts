'use strict'
import axios from 'axios'
import IPokemon from '../interface/IPokemon.interface';
import { storageService } from './async-storage.service';
import { localStorageService } from './storageService';

export const pokemonService = {
    getPokemons
}

const POKEMON_QUANTITY: number = 3;
const POKEMON_DB: string = 'pokemonDB';

async function getPokemons(): Promise<IPokemon[]> {
    const pokemons = await storageService.query(POKEMON_DB) || _generatePokemons()
    return pokemons
}

async function _generatePokemons(): Promise<IPokemon[]> {
    const pokemons = []
    for (let i = 0; i < POKEMON_QUANTITY; i++) {
        const pokemon = await _buildPokemonData((i + 1))
        pokemons.push(pokemon)
    }
    localStorageService.save(POKEMON_DB, pokemons)
    return pokemons
}

async function _buildPokemonData(pokemonId: number): Promise<IPokemon> {
    const res: any = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    const pokemon = res.data
    console.log('res.data', res.data)
    return {
        _id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other.dream_world.front_default,
        weight: pokemon.weight,
        height: pokemon.height,
        types: pokemon.types.map((type: any) => (type.type.name)),
        abilities: pokemon.abilities.map((ability: any) => (ability.ability.name))
    }
}


