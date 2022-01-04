'use strict'

export const eventBusService = {
    on,
    emit,
    showSuccessMsg,
    showErrorMsg
};

function on(eventName: string, listener: any) {

    const callListener = ({ detail }: any) => {
        listener(detail);
    };

    window.addEventListener(eventName, callListener);

    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName: string, data: any) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}


export function showUserMsg(txt: string, type: string = '') {
    eventBusService.emit('show-user-msg', { txt, type })
    console.log('User MSG!!')
}
export function showSuccessMsg(txt: string) {
    showUserMsg(txt, 'success')
}
export function showErrorMsg(txt: string) {
    showUserMsg(txt, 'danger')
}

window.myBus = eventBusService;
window.showUserMsg = showUserMsg;


declare global {
    interface Window { myBus: any, showUserMsg: any }
}

