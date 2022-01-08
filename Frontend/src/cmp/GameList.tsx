import IGame from "../interface/IGame.interfacets"
import { GamePreview } from "./GamePreview"

interface PropType {
    games: IGame[] | any
}

export const GameList = ({ games }: PropType) => {
    return (
        <section className="game-list">
            {games.map((game: IGame) => (<GamePreview key={game._id} game={game} />))}
        </section>
    )
}
