import React, { useEffect, useState } from 'react'
import { Loading } from '../cmp/Loading';
import { PokemonList } from '../cmp/PokemonList';
import IPokemon from '../interface/IPokemon.interface';
import { eventBusService } from '../services/event-bus.service';
import { pokemonService } from '../services/pokemon.service'

export const MainApp = () => {

    const [pokemons, setPokemons] = useState<IPokemon[] | null>(null);

    useEffect(() => {
        loadPokemons()
    }, [])

    const loadPokemons = async () => {
        const pokemonsToShow = await pokemonService.getPokemons()
        setPokemons(pokemonsToShow)
        eventBusService.showSuccessMsg('Welcome')
    }

    if (!pokemons) return <Loading />

    return (
        <section className="main-app">
            <h1>Main App</h1>
            <p>My React Starter TypeScript with Hooks and Routing</p>
            {pokemons && <PokemonList pokemons={pokemons} />}
        </section>
    )
}
