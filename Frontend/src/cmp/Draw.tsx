import React, { useEffect, useRef, useState } from 'react'
import IPosition from '../interface/IPosition.interface';
import { utilService } from '../services/util.service';
import { useDispatch, useSelector } from 'react-redux';
import { updateDraw } from '../store/actions/gameActions';
import { canvasService } from '../services/canvas.service';

export const Draw = () => {

    const { game, roundIdx } = useSelector(state => state.gameModule)
    const dispatch = useDispatch()
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D>(null)

    useEffect(() => {
        initCanvas()
    }, [])

    const initCanvas = () => {
        const canvas = canvasRef.current as HTMLCanvasElement
        canvas.width = 350
        canvas.height = 175
        contextRef.current = canvasService.initContext(canvas)
    }

    const startDrawing = (ev: MouseEvent | TouchEvent): void => {
        canvasService.startDrawing(ev, contextRef.current)
        setIsDrawing(true);
    }

    const draw = (ev: MouseEvent | TouchEvent): void => {
        if (!isDrawing) return;
        const imgUrl = canvasService.draw(ev, contextRef.current, canvasRef.current)
        dispatch(updateDraw(game, imgUrl, roundIdx))
    }

    const finishDrawing = (): void => {
        canvasService.finishDrawing(contextRef.current)
        setIsDrawing(false);
    }

    return (
        <section className="draw tac">
            <h1>{game.rounds[roundIdx].guessingWord}</h1>
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
