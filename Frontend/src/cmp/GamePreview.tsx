import { GameSummary } from './GameSummary'

export const GamePreview = ({ game }: any) => {

    const { round } = game.rounds[0]

    return (
        <section className="game-preview">
            <GameSummary game={game} />
            <img src={round?.img} />
            <h2>{round?.guessingWord}</h2>
        </section>
    )
}
