import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { utilService } from '../services/util.service';
import { wordService } from '../services/word.service'
import { startNextRound } from '../store/actions/gameActions';
import { Loading } from './Loading';
import { SelectList } from './SelectList';

export const ChooseWord = ({ historyPush }: any) => {
    const dispatch = useDispatch()
    const { game, roundIdx } = useSelector(state => state.gameModule)

    const [level, setLevel] = useState<string>('easy');
    const [words, setWords] = useState<string[] | null>(null);
    const [word, setWord] = useState<string>('');
    const [levels, setLevels] = useState<string[] | null>(null);

    useEffect(() => {
        const wordsToShow: string[] = wordService.getWords(level)
        setWords(wordsToShow)
    }, [level])

    useEffect(() => {
        const levelsToShow: string[] = wordService.getLevels()
        setLevels(levelsToShow)
    }, [])

    const onStartNextRound = async () => {
        await dispatch(startNextRound(game, roundIdx, level, word))
        historyPush(`/game/${game._id}/draw-guess`)
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


