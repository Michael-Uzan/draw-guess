import IPosition from "../interface/IPosition.interface"
import { eventBusService } from "./event-bus.service"

export const utilService = {
    makeId,
    getCapitalDisplay,
    copyToClipboard
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

function copyToClipboard(link: string): void {
    navigator.clipboard.writeText(link);
    eventBusService.showSuccessMsg('Link copied!')
}