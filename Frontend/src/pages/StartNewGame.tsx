import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../cmp/Login";
import { RootState } from "../store";
import { onLogout } from "../store/actions/userActions";
import { UserState } from "../store/reducers/userReducer";

export const StartNewGame = ({ history }: any) => {

    const { loggedinUser }: UserState = useSelector((state: RootState) => state.userModule)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loggedinUser) dispatch(onLogout())
    }, [])

    const historyPush = (route: string): void => {
        history.push(route)
    }

    return (
        <section className="start-new-game tac">
            <h1>Start a new game!</h1>
            <Login historyPush={historyPush} />
        </section>
    )
}
