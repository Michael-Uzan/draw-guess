import { GameApp } from "../pages/GameApp";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/',
        component: GameApp,
    }
]

export default routes;
