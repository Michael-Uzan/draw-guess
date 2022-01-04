import React, { useEffect, useRef, useState } from 'react'

export const GameApp = () => {
    const [drawing, setDrawing] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = '350'
        canvas.height = '175'

        // canvas.width = elContainer.current.innerWidth * 2
        // canvas.height = elContainer.current.innerHeight * 2
        // canvas.width = window.innerWidth * 2;
        // canvas.height = window.innerHeight * 2;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
        contextRef.current = context;
    }, [])

    const startDrawing = ({ nativeEvent }) => {
        const { startPosX, startPosY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(startPosX, startPosY);
        setIsDrawing(true);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
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
