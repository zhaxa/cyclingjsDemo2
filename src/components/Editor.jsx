import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import Toolbar from "./Toolbar";

const frontJersey = new URL("../assets/jersey_front.png", import.meta.url).href;
const backJersey = new URL("../assets/jersey_back.png", import.meta.url).href;

const Editor = () => {
  const [canvas, setCanvas] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const [frontCanvasState, setFrontCanvasState] = useState(null);
  const [backCanvasState, setBackCanvasState] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas("canvas", {
      width: 400,
      height: 500,
      backgroundColor: "#fff",
    });
    setCanvas(newCanvas);
    
    fabric.Image.fromURL(frontJersey, (img) => {
      img.set({
        left: newCanvas.width / 2 - img.width / 2,
        top: 20,
        selectable: false,
      });
      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
    });

    return () => newCanvas.dispose();
  }, []);

  const toggleSide = () => {
    if (!canvas) return;
    
    if (isFront) {
      setFrontCanvasState(canvas.toJSON());
      canvas.clear();
      if (backCanvasState) {
        canvas.loadFromJSON(backCanvasState, () => canvas.renderAll());
      }
      fabric.Image.fromURL(backJersey, (img) => {
        img.set({
          left: canvas.width / 2 - img.width / 2,
          top: 20,
          selectable: false,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    } else {
      setBackCanvasState(canvas.toJSON());
      canvas.clear();
      if (frontCanvasState) {
        canvas.loadFromJSON(frontCanvasState, () => canvas.renderAll());
      }
      fabric.Image.fromURL(frontJersey, (img) => {
        img.set({
          left: canvas.width / 2 - img.width / 2,
          top: 20,
          selectable: false,
        });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
    setIsFront(!isFront);
  };

  return (
    <div className="editor-container">
      <button onClick={toggleSide} className="switch-side">{isFront ? "Другая сторона" : "Передняя сторона"}</button>
      <canvas id="canvas"></canvas>
      <Toolbar canvas={canvas} />
    </div>
  );
};

export default Editor;
