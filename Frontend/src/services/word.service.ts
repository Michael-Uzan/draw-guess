import { httpService } from "./http.service"

export const wordService = {
    getWords,
    getLevels
}

function getWords(level: string): Promise<string[]> {
    return httpService.get(`word/${level}`)
}

function getLevels(): Promise<string[]> {
    return httpService.get('word/levels')
}