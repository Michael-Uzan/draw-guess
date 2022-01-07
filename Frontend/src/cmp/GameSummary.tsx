import React from 'react'
import { useSelector } from 'react-redux'
import IGame from '../interface/IGame.interfacets'
import { RootState } from '../store'
import { UserState } from '../store/reducers/userReducer'
import { Avatar } from './Avatar'

interface PropType {
    game: IGame
}

export const GameSummary = ({ game }: PropType) => {

    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)

    const getRound = (): number => {
        return game.rounds.length
    }

    const getStatus = (userId: string): string => {
        const roundIdx: number = getRound() - 1
        const isDrawing: boolean = (userId === game.rounds[roundIdx].userDrawingId)
        if (loggedinUser?._id === userId) {
            switch (game.status) {
                case 'invite-login':
                    if (isDrawing) return 'Me invite'
                    else return 'Me login'
                case 'waiting-choose':
                    if (isDrawing) return 'Me choose'
                    else return 'Me waiting'
                case 'draw-guess':
                    if (isDrawing) return 'Me drawing'
                    else return 'Me guesing'
                default:
                    return ''
            }
        }
        else return ''
    }

    return (
        <section className="game-summary tac">
            <h1 className="title">Round {getRound()}</h1>
            <div className=" flex space-between align-center">
                <div>
                    <Avatar user={game.user1} />
                    <h6>{getStatus(game?.user1?._id as string)}</h6>
                </div>
                <img className="img-vs" src="https://www.nicepng.com/png/full/271-2712237_vs-rooster-teeth.png" />
                <div>
                    <Avatar user={game.user2} />
                    <h6>{getStatus(game?.user2?._id as string)}</h6>
                </div>
            </div>
        </section>
    )
}
