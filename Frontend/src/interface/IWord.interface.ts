export interface IWord {
    easy: string[],
    medium: string[],
    hard: string[]
}

export type WordType = {
    [key: string]: string[]
}