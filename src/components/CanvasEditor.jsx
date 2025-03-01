import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import TemplatePicker from "./TemplatePicker";
import Toolbar from "./Toolbar";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#fff",
    });

    // 📌 Автоматически устанавливаем белую веломайку как фон
    fabric.Image.fromURL("/assets/jersey.jpg", (img) => {
      img.scaleToWidth(500);
      img.scaleToHeight(600);
      img.set({ selectable: false });
      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
    });

    setCanvas(newCanvas);
    return () => newCanvas.dispose();
  }, []);

  // 📌 Установка другого шаблона
  const setBackground = (imgSrc) => {
    if (!canvas) return;

    fabric.Image.fromURL(imgSrc, (img) => {
      img.scaleToWidth(500);
      img.scaleToHeight(600);
      img.set({ selectable: false });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  };

  return (
    <div className="flex flex-col items-center">
      <TemplatePicker setBackground={setBackground} />
      <canvas ref={canvasRef} className="border shadow-lg" />
      <Toolbar canvas={canvas} />
    </div>
  );
};

export default CanvasEditor;
