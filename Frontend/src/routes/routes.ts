import { GameApp } from "../pages/GameApp";
import { HomePage } from "../pages/HomePage";
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
    },
    {
        path: '/',
        component: HomePage,
    }
]

export default routes;
