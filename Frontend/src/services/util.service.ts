import IPosition from "../interface/IPosition.interface"
import { eventBusService } from "./event-bus.service"

export const utilService = {
    makeId,
    getCapitalDisplay,
    copyToClipboard,
    showUpdateMassage,
    sortByValue
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

function showUpdateMassage(route: string): void {
    switch (route) {
        case 'waiting-choose':
            eventBusService.showSuccessMsg('Next round!')
            break;
        case 'draw-guess':
            eventBusService.showSuccessMsg('Lets Start!')
            break;
        default:
            break;
    }
}

function sortByValue(array: any[], value: string) {
    return array.sort((a, b) => (b[value] - a[value]))
}