import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eventBusService } from '../services/event-bus.service';
import { utilService } from '../services/util.service';
import { wordService } from '../services/word.service'
import { RootState } from '../store';
import { startNextRound } from '../store/actions/gameActions';
import { GameState } from '../store/reducers/gameReducer';
import { Loading } from './Loading';
import { SelectList } from './SelectList';

interface PropType {
    historyPush: Function
}

export const ChooseWord = ({ historyPush }: PropType) => {
    const dispatch = useDispatch()
    const { game, roundIdx }: GameState = useSelector((state: RootState) => state.gameModule)

    const [level, setLevel] = useState<string>('easy');
    const [words, setWords] = useState<string[] | null>(null);
    const [word, setWord] = useState<string>('');
    const [levels, setLevels] = useState<string[] | null>(null);

    useEffect(() => {
        loadWordsByLevel()
    }, [level])

    const loadWordsByLevel = async (): Promise<void> => {
        const wordsToShow: string[] = await wordService.getWords(level as string)
        setWords(wordsToShow)
    }

    useEffect(() => {
        loadLevels()
    }, [])

    const loadLevels = async (): Promise<void> => {
        const levelsToShow: string[] = await wordService.getLevels()
        setLevels(levelsToShow)
    }

    const onStartNextRound = async () => {
        if (!game) return
        if (!word) {
            eventBusService.showErrorMsg('Choose word!')
            return
        }
        await dispatch(startNextRound(game, roundIdx, level, word))
        historyPush(`draw-guess`)
    }

    if (!levels || !words) return <Loading />

    return (
        <section className="choose-word tac">
            <SelectList setChosenValue={setLevel} value={level} displays={levels} />
            <SelectList setChosenValue={setWord} value={word} displays={words} />
            <h2>Your chosen word: <span>{utilService.getCapitalDisplay(word)}</span>  </h2>
            <button onClick={onStartNextRound}>Start Next Round</button>
            <p>Easy 1 point <br />
                Medium 3 points <br />
                Hard 5 points</p>
        </section>
    )
}


