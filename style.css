:root {
    --text-color: #ffffff;
    --accent-color: #e0e0e0;
    --bg-image: url("27224.jpg");
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: #111;
    color: var(--text-color);
    font-family: "Montserrat", sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
}

/* Блокируем скролл пока не открыт конверт */
body.locked {
    overflow: hidden;
    height: 100vh;
}

/* ---------------- КОНВЕРТ ---------------- */
#envelope-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1a1a1a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition:
        opacity 1s ease 0.5s,
        visibility 1s ease 0.5s;
}

#envelope-overlay.hidden {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.envelope-container {
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;
    perspective: 1000px; /* Для 3D эффекта крышки */
}

.envelope-container:hover {
    transform: scale(1.03);
}

.envelope {
    position: relative;
    width: 320px;
    height: 200px;
    background-color: #242424; /* Задняя стенка */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

/* Само письмо внутри */
.envelope .letter {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    background-color: #f7f7f7;
    background-image: repeating-linear-gradient(
        transparent,
        transparent 20px,
        #eee 20px,
        #eee 21px
    );
    z-index: 1;
    transition: transform 0.6s ease-in-out 0.3s; /* Выезжает с задержкой */
}

/* Лицевые стороны (кармашки) конверта */
.envelope .body {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 160px 130px 160px;
    border-color: transparent transparent #1c1c1c transparent;
    z-index: 3;
}
.envelope::before,
.envelope::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 2;
}
.envelope::before {
    /* левый треугольник */
    left: 0;
    border-width: 200px 0 0 160px;
    border-color: transparent transparent transparent #202020;
}
.envelope::after {
    /* правый треугольник */
    right: 0;
    border-width: 200px 160px 0 0;
    border-color: transparent #1a1a1a transparent transparent;
}

/* Верхняя крышка */
.envelope .flap {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 120px 160px 0 160px;
    border-color: #2c2c2c transparent transparent transparent;
    z-index: 4;
    transform-origin: top;
    transition:
        transform 0.7s ease-in-out,
        z-index 0s 0.3s;
}

/* Печать */
.envelope .seal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #d1d1d1;
    color: #111;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 5;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s ease;
}

.envelope .seal .heart {
    font-size: 20px;
    margin-bottom: 2px;
}

.envelope .seal .text {
    font-size: 9px;
    letter-spacing: 2px;
    font-weight: 500;
}

.tap-text {
    text-align: center;
    margin-top: 30px;
    font-size: 12px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
}

/* --- АНИМАЦИЯ ОТКРЫТИЯ --- */
.envelope-container.open .flap {
    transform: rotateX(180deg);
    z-index: 0; /* Уходит на задний план */
}
.envelope-container.open .seal {
    opacity: 0; /* Печать исчезает */
}
.envelope-container.open .letter {
    transform: translateY(-40px); /* Письмо немного выезжает вверх */
}

/* ---------------- ОСНОВНОЙ САЙТ ---------------- */
.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    z-index: -2;
}

.background-overlay::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        rgba(0, 0, 0, 0.85) 100%
    );
    z-index: -1;
}

.container {
    width: 100%;
    max-width: 500px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

/* Тексты и шапка */
.line-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 15px;
    margin-bottom: 20px;
}
.line-title .line {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.4);
    flex-grow: 1;
    max-width: 80px;
}
.line-title .text {
    font-size: 14px;
    letter-spacing: 4px;
    font-weight: 300;
}
.cursive-text {
    font-family: "Pinyon Script", cursive;
    font-size: 52px;
    line-height: 1.1;
    font-weight: 400;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.heart-icon {
    font-size: 24px;
    margin-bottom: 40px;
    opacity: 0.8;
}
.intro {
    font-family: "Cormorant Garamond", serif;
    font-size: 19px;
    line-height: 1.4;
    margin-bottom: 40px;
    letter-spacing: 0.5px;
}

/* Детали */
.details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 50px; /* Увеличил отступ из-за удаления дресс-кода */
}
.detail-item {
    display: flex;
    align-items: center;
    gap: 20px;
    text-align: left;
}
.icon {
    width: 50px;
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}
.icon svg {
    width: 32px;
    height: 32px;
    opacity: 0.8;
}
.text-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.text-content .label {
    font-size: 10px;
    letter-spacing: 2px;
    color: #ccc;
}
.text-content .value {
    font-family: "Cormorant Garamond", serif;
    font-size: 24px;
}
.text-content .small-text {
    font-size: 16px;
}

/* Заметка */
.notice-item {
    display: flex;
    align-items: center;
    gap: 15px;
    text-align: left;
    margin-top: 10px;
    padding-left: 10px;
}
.icon-small svg {
    width: 20px;
    height: 20px;
    opacity: 0.7;
}
.notice-item p {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.4;
    color: #ddd;
}

footer {
    width: 100%;
    margin-top: 20px;
}
.heart-small {
    font-size: 16px;
    margin: 0 10px;
}
.final-text {
    font-size: 11px;
    letter-spacing: 2px;
    margin-top: 15px;
    opacity: 0.9;
}

/* АНИМАЦИИ ПОЯВЛЕНИЯ САЙТА */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition:
        opacity 1s ease-out,
        transform 1s ease-out;
}
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
.delay-1 {
    transition-delay: 0.2s;
}
.delay-2 {
    transition-delay: 0.4s;
}
.delay-3 {
    transition-delay: 0.6s;
}
.delay-4 {
    transition-delay: 0.8s;
}
.delay-5 {
    transition-delay: 1s;
}
.delay-6 {
    transition-delay: 1.2s;
}
