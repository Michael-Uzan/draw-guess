import React from 'react'
import { WordToLines } from './WordToLines'
import { useDispatch, useSelector } from 'react-redux';

export const Guess = () => {

    const { game, roundIdx } = useSelector(state => state.gameModule)

    return (
        <section className="guess tac">
            <WordToLines word={game.rounds[roundIdx].guessingWord} />
            <img src={game.rounds[roundIdx].img} />
            <form >
                <input type="text" />
                <button>Guess!</button>
            </form>
        </section>
    )
}
