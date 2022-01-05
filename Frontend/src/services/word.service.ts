import { wordData } from "../data/word.data"

export const wordService = {
    getWords,
    getLevels
}

function getWords(level: string): string[] {
    return wordData[level]
}

function getLevels(): string[] {
    const levels = []
    for (const level in wordData) {
        levels.push(level)
    }
    return levels
}