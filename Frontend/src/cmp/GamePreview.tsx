import IGame from '../interface/IGame.interfacets'
import IRound from '../interface/IRound.interface'
import { GameSummary } from './GameSummary'

interface PropType {
    game: IGame
}

export const GamePreview = ({ game }: PropType) => {

    const round: IRound = game.rounds[0]

    return (
        <section className="game-preview">
            <GameSummary game={game} />
            <img src={round?.img} />
            <h2>{round?.guessingWord}</h2>
        </section>
    )
}
