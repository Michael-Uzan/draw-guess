import { GameApp } from "../pages/GameApp";
import { StartNewGame } from "../pages/StartNewGame";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/game/:gameId',
        component: GameApp,
    },
    {
        path: '/game',
        component: StartNewGame,
    }
]

export default routes;
