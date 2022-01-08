import React, { FormEvent } from 'react'
import { WordToLines } from './WordToLines'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { finishRound } from '../store/actions/gameActions';
import { eventBusService } from '../services/event-bus.service';
import { RootState } from '../store';
import { GameState } from '../store/reducers/gameReducer';
import IGame from '../interface/IGame.interfacets';
import { CountDown } from './CountDown';

interface PropType {
    historyPush: Function
}

export const Guess = ({ historyPush }: PropType) => {

    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)
    const dispatch = useDispatch()
    const [guess, handleChange, setGuess] = useForm({
        guessingWord: ''
    })

    const onTimeOver = async () => {
        eventBusService.showErrorMsg('Time is up!')
        const isVictory: boolean = false
        await dispatch(finishRound(game as IGame, roundIdx, isVictory))
        historyPush(`waiting-choose`)
    }

    const onGuess = async (ev: FormEvent<HTMLFormElement> | null = null) => {
        try {
            if (ev) ev.preventDefault();
            if (checkVictory()) {
                eventBusService.showSuccessMsg('Correct! You earn ' + game?.rounds[roundIdx].level + ' points!')
                const isVictory: boolean = true
                dispatch(finishRound(game as IGame, roundIdx, isVictory))
                historyPush(`waiting-choose`)
            } else {
                setGuess({ guessingWord: '' })
                eventBusService.showErrorMsg('Worng guess!')
            }
        } catch (err) {
            console.log('cannot guess', err)
        }
    }

    const checkVictory = (): boolean => {
        const regex: RegExp = new RegExp(guess.guessingWord, 'i')
        return regex.test(game?.rounds[roundIdx].guessingWord as string)
    }

    return (
        <section className="guess tac">
            <CountDown targetTime={Date.now() + 1000 * 70} dueFunc={onTimeOver} />
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
