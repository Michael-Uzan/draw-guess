import IPosition from "../interface/IPosition.interface";

export const canvasService = {
    initContext,
    startDrawing,
    finishDrawing,
    draw,
    getImgUrl
}

function initContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    return context
}

function startDrawing(ev: MouseEvent | TouchEvent, context: CanvasRenderingContext2D): void {
    const { x, y }: IPosition = _getEvPos(ev)
    context.beginPath();
    context.moveTo(x, y);
}

function draw(ev: MouseEvent | TouchEvent, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): string {
    const { x, y }: IPosition = _getEvPos(ev)
    context.lineTo(x, y);
    context.stroke();
    return canvas.toDataURL('image/jpeg', 1.0)
}

function finishDrawing(context: CanvasRenderingContext2D): void {
    context.closePath();
}

function getImgUrl(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL('image/jpeg', 1.0)
}

function _getEvPos(ev: MouseEvent | TouchEvent | any): IPosition {
    const touchEvents: string[] = ['touchstart', 'touchmove', 'touchend'];
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
