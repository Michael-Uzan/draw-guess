import IPosition from "../interface/IPosition.interface"

export const utilService = {
    makeId,
    getCapitalDisplay
}

function makeId(length: number = 15): string {
    let txt = ''
    const possible = '0123456789abcdefghijclmnoartxyz'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getCapitalDisplay(word: string): string {
    return (word.charAt(0).toUpperCase() + word.slice(1));
}