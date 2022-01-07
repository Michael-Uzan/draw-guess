import IGame from "../interface/IGame.interfacets"
import { GamePreview } from "./GamePreview"

export const GameList = ({ games }: any) => {
    return (
        <section className="game-list">
            {games.map((game: IGame, idx: number) => (idx < 3 ? <GamePreview game={game} /> : <></>))}
        </section>
    )
}
