import React from 'react'
import IPokemon from '../interface/IPokemon.interface'

interface PropType {
    pokemon: IPokemon
}

export const PokemonPreview = ({ pokemon }: PropType) => {
    return (
        <div className="pokemon-preview">
            <img src={pokemon.img} />
            <small>#{pokemon._id}</small>
            <h3>{pokemon.name}</h3>
        </div>
    )
}
