import IPosition from "../interface/IPosition.interface"

export const utilService = {
    makeId,
    getEvPos
}

function makeId(length: number = 15): string {
    let txt = ''
    const possible = '0123456789abcdefghijclmnoartxyz'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getEvPos(ev: MouseEvent | TouchEvent): IPosition {
    const touchEvents = ['touchstart', 'touchmove', 'touchend'];
    let pos: IPosition
    if (touchEvents.includes(ev.type)) {
        // ev.preventDefault()
        const { pageX, pageY } = ev.changedTouches[0]
        const { offsetLeft, offsetTop, clientLeft, clientTop } = ev.changedTouches[0].target
        pos = {
            x: pageX - offsetLeft - clientLeft,
            y: pageY - offsetTop - clientTop
        }
    } else {
        pos = {
            x: ev.nativeEvent.offsetX,
            y: ev.nativeEvent.offsetY
        }
    }
    return pos
}