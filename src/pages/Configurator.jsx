import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "../styles.css";

import TemplatePicker from "../components/TemplatePicker";
import Toolbar from "../components/Toolbar";

const frontJersey = new URL("../assets/jersey.png", import.meta.url).href;
const backJersey = new URL("../assets/jerseyback.jpg", import.meta.url).href;

const template1Image = new URL("../assets/faze 3.png", import.meta.url).href;
const template2Image = new URL("../assets/faze 1.png", import.meta.url).href;
const template3Image = new URL("../assets/cloud9.jpg", import.meta.url).href;

const Configurator = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isFront, setIsFront] = useState(true);
  const frontDesign = useRef(null);
  const backDesign = useRef(null);

  const loadJersey = (canvas, imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      if (!img) {
        console.error("Ошибка загрузки веломайки!");
        return;
      }
      const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
      img.scale(scaleFactor);
      img.set({
        left: (canvas.width - img.width * scaleFactor) / 2,
        top: (canvas.height - img.height * scaleFactor) / 2,
        selectable: false,
      });
      canvas.add(img);
      canvas.sendToBack(img);
      canvas.renderAll();
    });
  };

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.dispose();
      fabricCanvas.current = null;
    }

    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current, {
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.6,
        backgroundColor: "white",
      });
      fabricCanvas.current = newCanvas;
      loadJersey(newCanvas, isFront ? frontJersey : backJersey);
      
      const savedDesign = isFront ? frontDesign.current : backDesign.current;
      if (savedDesign) {
        newCanvas.loadFromJSON(savedDesign, () => newCanvas.renderAll());
      }
    }
  }, [isFront]);

  useEffect(() => {
    if (!selectedTemplate) return;
    const canvas = fabricCanvas.current;
    fabric.Image.fromURL(selectedTemplate, (img) => {
      img.set({
        left: 150,
        top: 150,
        scaleX: 0.2,
        scaleY: 0.2,
        selectable: true,
        hasControls: true,
      });
      canvas.add(img);
      canvas.renderAll();
    });
    
  }, [selectedTemplate]);

  const toggleJerseySide = () => {
    if (!fabricCanvas.current) return;
    if (isFront) {
      frontDesign.current = JSON.stringify(fabricCanvas.current);
    } else {
      backDesign.current = JSON.stringify(fabricCanvas.current);
    }
    setIsFront(!isFront);
  };

  return (
    <div className="configurator-container">
      <button className="back-button" onClick={() => (window.location.href = "/")}>Назад</button>
      <h1>Редактор Веломайки</h1>

      <TemplatePicker
        template1Image={template1Image}
        template2Image={template2Image}
        template3Image={template3Image}
        onTemplateSelect={setSelectedTemplate}
      />

      <canvas ref={canvasRef} className="canvas"></canvas>

      <Toolbar canvas={fabricCanvas.current} />
      <button className="toggle-button" onClick={toggleJerseySide}>
        {isFront ? "Другая сторона" : "Передняя сторона"}
      </button>
    </div>
  );
};

export default Configurator;
