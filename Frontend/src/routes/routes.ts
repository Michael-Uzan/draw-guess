import { GameApp } from "../pages/GameApp";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/game/:gameId',
        component: GameApp,
    }
]

export default routes;
