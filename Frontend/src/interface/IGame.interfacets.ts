import IRound from "./IRound.interface";

export default interface IGame {
    _id?: string,
    rounds: IRound[]
}

