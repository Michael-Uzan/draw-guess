import React from 'react'
import IPokemon from '../interface/IPokemon.interface'
import { PokemonPreview } from './PokemonPreview'

interface PropType {
    pokemons: IPokemon[]
}

export const PokemonList = ({ pokemons }: PropType) => {
    return (
        <section className="pokemon-list">
            {pokemons.map((pokemon: IPokemon) => (<PokemonPreview pokemon={pokemon} />))}
        </section>
    )
}
