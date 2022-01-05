import React from 'react'
import IGame from '../interface/IGame.interfacets'
import { Avatar } from './Avatar'

interface PropType {
    game: IGame
}

export const GameSummary = ({ game }: PropType) => {

    const getRound = () => {
        return game.rounds.length
    }

    return (
        <section className="game-summary tac">
            <h1>Round {getRound()}</h1>
            <div className=" flex space-between align-center">
                <Avatar user={game.user1} />
                <img className="img-vs" src="https://www.nicepng.com/png/full/271-2712237_vs-rooster-teeth.png" />
                <Avatar user={game.user2} />
            </div>
        </section>
    )
}
