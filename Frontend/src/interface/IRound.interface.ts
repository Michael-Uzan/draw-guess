import IUser from "./IUser.interfacets";

export default interface IRound {
    img: string,
    guessingWord: string
    level: number
    time: number
    playerGuessing: IUser
    playerDrawing: IUser
}