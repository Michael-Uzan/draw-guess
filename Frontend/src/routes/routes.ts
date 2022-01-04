import { About } from "../pages/About";
import { MainApp } from "../pages/MainApp";

interface IRoutes {
    path: string,
    component: any
}

const routes: IRoutes[] = [
    {
        path: '/about',
        component: About,
    },
    {
        path: '/',
        component: MainApp,
    }
]

export default routes;
