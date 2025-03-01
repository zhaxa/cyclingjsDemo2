import PropTypes from "prop-types";

const TemplatePicker = ({ template1Image, template2Image, template3Image, onTemplateSelect }) => {
  return (
    <div className="template-picker">
      {/* Передаем изображения в TemplatePicker */}
      <img
        src={template1Image}
        alt="Template 1"
        onClick={() => onTemplateSelect(template1Image)} // Передаем путь к шаблону
        className="template"
      />
      <img
        src={template2Image}
        alt="Template 2"
        onClick={() => onTemplateSelect(template2Image)} // Передаем путь ко второму шаблону
        className="template"
      />
      <img
        src={template3Image}
        alt="Template 3"
        onClick={() => onTemplateSelect(template3Image)} // Передаем путь к третьему шаблону
        className="template"
      />
    </div>
  );
};

TemplatePicker.propTypes = {
  template1Image: PropTypes.string.isRequired,
  template2Image: PropTypes.string.isRequired,
  template3Image: PropTypes.string.isRequired,
  onTemplateSelect: PropTypes.func.isRequired,
};

export default TemplatePicker;
