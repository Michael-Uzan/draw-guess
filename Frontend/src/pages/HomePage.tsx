import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../store"
import { onLogout } from "../store/actions/userActions"
import { UserState } from "../store/reducers/userReducer"

export const HomePage = () => {

    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loggedinUser) dispatch(onLogout())
    }, [])

    return (
        <section className="home-page tac">
            <h1>Welcome!</h1>
            <button>
                <Link to='/game' >Create a new Game</Link>
            </button>
        </section>
    )
}
