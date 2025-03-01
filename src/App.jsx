import React, { useState } from "react";
import Configurator from "./pages/Configurator";
import "./styles.css";

const heroImage = "/src/assets/pogacar2.png"; // Главное изображение на главной

const App = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="container">
      {!started ? (
        <div className="homepage">
          {/* 🔹 Блок с изображением */}
          <div className="hero-section">
            <img src={heroImage} alt="Веломайка" className="hero-image" />
            <h1 className="hero-title">
              Уникальные веломайки с вашим индивидуальным дизайном, полная свобода!
            </h1>
          </div>

          {/* 🔹 Блок преимуществ */}
          <div className="advantages">
            <h2>Почему выбирают нас?</h2>
            <div className="advantages-list">
              <div className="advantage-item">
                <h3>🎨 Полная кастомизация</h3>
                <p>Выбирайте шаблон или создавайте свой уникальный стиль.</p>
              </div>
              <div className="advantage-item">
                <h3>📥 Сохранение макета</h3>
                <p>Скачивайте макет без регистрации и сложностей.</p>
              </div>
              <div className="advantage-item">
                <h3>🚴 Качество материалов</h3>
                <p>Дышащие, прочные и комфортные ткани для велоспорта.</p>
              </div>
              <div className="advantage-item">
                <h3>🚀 Быстрое производство</h3>
                <p>Изготовление и доставка в кратчайшие сроки.</p>
              </div>
            </div>
          </div>

          {/* 🔹 Кнопка старта */}
          <button className="start-button" onClick={() => setStarted(true)}>
            Начать создание
          </button>
        </div>
      ) : (
        <Configurator onBack={() => setStarted(false)} />
      )}
    </div>
  );
};

export default App;
