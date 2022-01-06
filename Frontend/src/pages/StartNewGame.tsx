import { useEffect, useState } from "react";
import { Loading } from "../cmp/Loading";
import { Login } from "../cmp/Login";
import { UserList } from "../cmp/UserList";
import IUser from "../interface/IUser.interfacets";
import { userService } from "../services/user.service";

export const StartNewGame = ({ history }: any) => {

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
