import { eventBusService } from "../../services/event-bus.service";
import { userService } from "../../services/user.service";

export function onLogin(userId: string) {
    return async (dispatch: Function) => {
        try {
            const user = await userService.login(userId)
            dispatch({
                type: 'SET_USER',
                user
            })
            eventBusService.showSuccessMsg(`Welcome ${user.username}!`)
            return user
        } catch (err) {
            console.log('Cannot login', err)
            eventBusService.showErrorMsg('Sorry cannot Login!')
            throw err
        }
    }
}

export function onLogout() {
    return async (dispatch: Function) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.log('Cannot logout', err)
            eventBusService.showErrorMsg('Sorry cannot Logout!')
        }
    }
}
