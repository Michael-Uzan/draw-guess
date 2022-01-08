import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { GameList } from "../cmp/GameList"
import { Loading } from "../cmp/Loading"
import { UserList } from "../cmp/UserList"
import IGame from "../interface/IGame.interfacets"
import IUser from "../interface/IUser.interfacets"
import { gameService } from "../services/game.service"
import { userService } from "../services/user.service"
import { utilService } from "../services/util.service"
import { RootState } from "../store"
import { onLogout } from "../store/actions/userActions"
import { UserState } from "../store/reducers/userReducer"

export const HomePage = () => {

    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)
    const dispatch = useDispatch()
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [lastGames, setLastGames] = useState<IGame | null>(null);

    useEffect(() => {
        if (loggedinUser) dispatch(onLogout())
        getBestUsers()
        getLastGame()
    }, [])

    const getBestUsers = async () => {
        let usersToShow: IUser[] = await userService.getUsers()
        usersToShow = utilService.sortByValue(usersToShow, 'points')
        usersToShow = usersToShow.slice(0, 3)
        setUsers(usersToShow)
    }

    const getLastGame = async () => {
        let gamesToShow: IGame = await gameService.getLastGames('finish')
        setLastGames(gamesToShow)
    }

    if (!users || !lastGames) return <Loading />

    return (
        <section className="home-page tac">
            <h1>Welcome!</h1>
            <button>
                <Link to='/game' >Create a new Game</Link>
            </button>
            <h2 className="how">How to play</h2>
            <ol>
                <li>Create new game</li>
                <li>Choose player</li>
                <li>Send a link to your friend and wait for him to join</li>
                <li>Start drawing and guessing!</li>
                <li>Enjoy!!!</li>
            </ol>
            <h1>Best 3 Users</h1>
            <UserList users={users} setSelectedUser={() => { }} />
            <h1>Last 3 Games</h1>
            <GameList games={lastGames} />
        </section>
    )
}
