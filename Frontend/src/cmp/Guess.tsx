import React from 'react'
import { WordToLines } from './WordToLines'

export const Guess = ({ game }: any) => {

    return (
        <section className="guess tac">
            <WordToLines word={game.rounds[game.rounds.length - 1].guessingWord} />
            <img src={game.rounds[game.rounds.length - 1].img} />
            <form >
                <input type="text" />
                <button>Guess!</button>
            </form>
        </section>
    )
}
