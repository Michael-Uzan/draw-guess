import React, { FormEvent } from 'react'
import { WordToLines } from './WordToLines'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { finishRound } from '../store/actions/gameActions';
import { eventBusService } from '../services/event-bus.service';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import IGame from '../interface/IGame.interfacets';

export const Guess = ({ historyPush }: any) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const dispatch = useDispatch()
    const [guess, handleChange, setGuess] = useForm({
        guessingWord: ''
    })

    const onGuess = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        try {
            if (ev) ev.preventDefault();
            if (checkVictory()) {
                eventBusService.showSuccessMsg('Correct! You earn ' + game?.rounds[roundIdx].level + ' points!')
                await dispatch(finishRound(game as IGame, roundIdx))
                historyPush(`waiting-choose`)
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
        return game?.rounds[roundIdx].guessingWord === guess.guessingWord
    }

    return (
        <section className="guess tac">
            <WordToLines word={game?.rounds[roundIdx].guessingWord} />
            <img src={game?.rounds[roundIdx].img} />
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
