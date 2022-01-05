import IUser from '../interface/IUser.interfacets'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER: string = 'loggedinUser'
const USER_DB: string = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getEmptyUser
}

async function login(username: String): Promise<IUser> {

    // INITALIZE:
    // const users = userData
    // localStorageService.save(User_DB, users)

    const user: IUser = await storageService.get(username, USER_DB)
    // const user: IUser = await httpService.post('auth/login', username)
    // if (!user) {
    //     throw new Error('login service error')
    // }
    return _saveLocalUser(user)
}

async function signup(newUser: IUser): Promise<IUser> {

    const user: IUser = await storageService.post(newUser, USER_DB)

    // const user: IUser = await httpService.post('auth/signup', newUser)
    return _saveLocalUser(user)
}

async function logout(): Promise<void> {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout', null)
}

function getLoggedinUser(): IUser | null {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

function getEmptyUser(): IUser {
    return {
        username: '',
        points: 0,
        img: '',
    }
}

function _saveLocalUser(user: IUser): IUser {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}