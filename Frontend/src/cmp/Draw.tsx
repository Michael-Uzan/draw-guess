import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateDraw } from '../store/actions/gameActions';
import { canvasService } from '../services/canvas.service';
import { RootState } from '../store';
import IGame from '../interface/IGame.interfacets';
import { CountDown } from './CountDown';

export const Draw = () => {

    const { game, roundIdx } = useSelector((state: RootState) => state.gameModule)
    const dispatch = useDispatch()
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)

    useEffect(() => {
        initCanvas()
    }, [])

    const initCanvas = () => {
        const canvas = canvasRef.current as HTMLCanvasElement
        canvas.width = 350
        canvas.height = 175
        contextRef.current = canvasService.initContext(canvas)
    }

    const startDrawing = (ev: MouseEvent | TouchEvent | any): void => {
        canvasService.startDrawing(ev, contextRef.current as CanvasRenderingContext2D)
        setIsDrawing(true);
    }

    const draw = (ev: MouseEvent | TouchEvent | any): void => {
        if (!isDrawing) return;
        const imgUrl = canvasService.draw(ev, contextRef.current as CanvasRenderingContext2D, canvasRef.current as HTMLCanvasElement)
        dispatch(updateDraw(game as IGame, imgUrl, roundIdx))
    }

    const finishDrawing = (): void => {
        canvasService.finishDrawing(contextRef.current as CanvasRenderingContext2D)
        setIsDrawing(false);
    }

    return (
        <section className="draw tac">
            <CountDown targetTime={Date.now() + 1000 * 70} dueFunc={() => { }} />
            <h1>{game?.rounds[roundIdx].guessingWord}</h1>
            <div className="canvas-container">
                <canvas
                    ref={canvasRef}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={finishDrawing}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={finishDrawing}
                />
            </div>
        </section>
    )
}
