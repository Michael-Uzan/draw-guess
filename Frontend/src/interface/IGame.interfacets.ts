import IRound from "./IRound.interface";
import IUser from "./IUser.interfacets";

export default interface IGame {
    _id?: string,
    status: string,
    user1: IUser | null,
    user2: IUser | null,
    rounds: IRound[]
}




