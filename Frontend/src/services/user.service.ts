import IGame from '../interface/IGame.interfacets'
import IUser from '../interface/IUser.interfacets'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER: string = 'loggedinUser'

const USER_DB: string = 'userDB'  // FOR DEVELOPING FRONTEND REASONS WORKING ON ASYNC LOCAL STORAGE

export const userService = {
    login,
    logout,
    getUsers,
    getLoggedinUser,
    updateUsersPoints,
    IsDrawing
}

async function login(userId: String): Promise<IUser> {
    const user: IUser = await httpService.post('auth/login', { userId })
    if (!user) {
        throw new Error('login service error')
    }
    return _saveLocalUser(user)

    // const user: IUser = await storageService.get(userId, USER_DB)
}

async function logout(): Promise<void> {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout', null)
}

async function getUsers() {
    return httpService.get('user')

    // const users: IUser[] = await storageService.query(USER_DB)
    // return users
}

function getLoggedinUser(): IUser | null {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

async function updateUsersPoints(game: IGame) {
    _updateUserPoints(game.user1 as IUser, game.user1?.points as number)
    _updateUserPoints(game.user2 as IUser, game.user2?.points as number)
}

async function _updateUserPoints(userToUpdate: IUser, points: number) {
    const user: IUser = await httpService.get(`user/${userToUpdate._id}`)
    user.points += points
    return httpService.put(`user/${user._id}`, { user })
}

function IsDrawing(game: IGame, roundIdx: number, loggedinUser: IUser): boolean {
    return (game.rounds[roundIdx].userDrawingId === loggedinUser?._id)
}

function _saveLocalUser(user: IUser): IUser {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}