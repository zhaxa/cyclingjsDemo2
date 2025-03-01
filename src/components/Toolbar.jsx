import PropTypes from "prop-types";
import { fabric } from "fabric";

const Toolbar = ({ canvas }) => {
  const addText = () => {
    const text = new fabric.Textbox("Твой текст", {
      left: 150,
      top: 150,
      fontSize: 24,
      fill: "#000",
      fontFamily: "Rubik",
      editable: true,
    });
    canvas.add(text);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.set({ scaleX: 0.5, scaleY: 0.5, left: 100, top: 100 });
        canvas.add(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const deleteSelected = () => {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
    }
  };

  return (
    <div className="toolbar">
      <div className="button-group">
        <button onClick={addText} className="bg-green">Текст</button>
        <button onClick={deleteSelected} className="bg-red">Удалить</button>
      </div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
  
};

Toolbar.propTypes = {
  canvas: PropTypes.object.isRequired,
};

export default Toolbar;
