import React, { FormEvent } from 'react'
import { WordToLines } from './WordToLines'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { finishRound } from '../store/actions/gameActions';
import { eventBusService } from '../services/event-bus.service';

export const Guess = ({ historyPush }: any) => {

    const { game, roundIdx } = useSelector(state => state.gameModule)
    const dispatch = useDispatch()
    const [guess, handleChange, setGuess] = useForm({
        guessingWord: ''
    })

    const onGuess = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        try {
            if (ev) ev.preventDefault();
            if (checkVictory()) {
                eventBusService.showSuccessMsg('Correct! You earn ' + game.rounds[roundIdx].level + ' points!')
                await dispatch(finishRound(game, roundIdx))
                historyPush(`/game/${game._id}/waiting-choose`)
            }
            else {
                setGuess({ guessingWord: '' })
                eventBusService.showErrorMsg('Worng guess!')
            }
        } catch (err) {
            console.log('cannot guess', err)
        }
    }

    const checkVictory = (): boolean => {
        return game.rounds[roundIdx].guessingWord === guess.guessingWord
    }

    return (
        <section className="guess tac">
            <WordToLines word={game.rounds[roundIdx].guessingWord} />
            <img src={game.rounds[roundIdx].img} />
            <form onSubmit={onGuess} >
                <input
                    type="text"
                    name="guessingWord"
                    value={guess.guessingWord}
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <button>Guess!</button>
            </form>
        </section>
    )
}
