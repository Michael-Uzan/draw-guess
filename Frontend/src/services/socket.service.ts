import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

const baseUrl: string = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

function createSocketService() {
    var socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName: string, cb: Function | any) {
            socket?.on(eventName, cb)
        },
        off(eventName: string, cb: Function | any = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName: string, data: any = null) {
            socket?.emit(eventName, data)
        },
        terminate() {
            socket = null
        }
    }
    return socketService
}