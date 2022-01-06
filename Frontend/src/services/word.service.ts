import { IndexType } from "typescript"
import { wordData } from "../data/word.data"
import { httpService } from "./http.service"

export const wordService = {
    getWords,
    getLevels
}

function getWords(level: string): Promise<string[]> {
    return httpService.get(`word/${level}`)
    // return wordData[level]
}

function getLevels(): Promise<string[]> {
    return httpService.get('word/levels')
    // const levels = []
    // for (const level in wordData) {
    //     levels.push(level)
    // }
    // return levels
}