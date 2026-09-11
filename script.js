document.addEventListener("DOMContentLoaded", () => {
  const envelopeOverlay = document.getElementById("envelope-overlay");
  const envelopeContainer = document.querySelector(".envelope-container");
  const animatedElements = document.querySelectorAll(".fade-in");

  // Функция запуска анимации контента сайта
  function startSiteAnimations() {
    animatedElements.forEach((el) => {
      el.classList.add("visible");
    });
  }

  envelopeContainer.addEventListener("click", () => {
    // 1. Запускаем CSS анимацию открытия конверта
    envelopeContainer.classList.add("open");

    // 2. Ждем, пока откинется крышка (0.8 сек), затем скрываем оверлей с конвертом
    setTimeout(() => {
      envelopeOverlay.classList.add("hidden");

      // Разблокируем скролл сайта
      document.body.classList.remove("locked");

      // 3. Сразу запускаем плавное появление текста приглашения
      startSiteAnimations();

      setTimeout(() => {
        envelopeOverlay.style.display = "none";
      }, 2000);
    }, 800); // 800 мс — время анимации конверта
  });
});
