import React, { useEffect, useRef, useState } from 'react'
import IPosition from '../interface/IPosition.interface';
import { utilService } from '../services/util.service';

export const GameApp = () => {
    const [drawing, setDrawing] = useState<string | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const contextRef = useRef<CanvasRenderingContext2D>(null)

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        canvas.width = 350
        canvas.height = 175

        // canvas.width = elContainer.current.innerWidth * 2
        // canvas.height = elContainer.current.innerHeight * 2
        // canvas.width = window.innerWidth * 2;
        // canvas.height = window.innerHeight * 2;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d") as CanvasRenderingContext2D
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextRef.current = context;
    }, [])

    const startDrawing = (ev: MouseEvent | TouchEvent): void => {
        const { x, y }: IPosition = utilService.getEvPos(ev)
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
    }

    const finishDrawing = (): void => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = (ev: MouseEvent | TouchEvent): void => {
        if (!isDrawing) return;
        const { x, y }: IPosition = utilService.getEvPos(ev)
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
        setDrawing(canvasRef.current.toDataURL('image/jpeg', 1.0));
    }

    return (
        <section className="game-app">
            <h1>Game App</h1>
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
            {drawing && <img src={drawing} />}
        </section>
    )
}
