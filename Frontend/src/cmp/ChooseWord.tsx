import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IndexType } from 'typescript';
import { eventBusService } from '../services/event-bus.service';
import { utilService } from '../services/util.service';
import { wordService } from '../services/word.service'
import { RootState } from '../store';
import { startNextRound } from '../store/actions/gameActions';
import { GameState } from '../store/reducers/gameReducer';
import { Loading } from './Loading';
import { SelectList } from './SelectList';

export const ChooseWord = ({ historyPush }: any) => {
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
        // historyPush(`/game/${game._id}/draw-guess`)
        historyPush(`draw-guess`)
    }

    if (!levels || !words) return <Loading />

    return (
        <section className="choose-word tac">
            <SelectList setChosenValue={setLevel} value={level} displays={levels} />
            <SelectList setChosenValue={setWord} value={word} displays={words} />
            <h2>Your chosen word: {utilService.getCapitalDisplay(word)} </h2>
            <button onClick={onStartNextRound}>Start Next Round</button>
        </section>
    )
}


