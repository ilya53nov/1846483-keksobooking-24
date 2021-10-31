const ALERT_SHOW_TIME = 5000;

// Функция для показа сообщения с ошибкой
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция проверки нажатой клавиши, возвращает true, если нажата клавиша Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция склонения слов https://jsfiddle.net/jp6chsa2/
const getDeclension = (forms, val) => {
  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return `${val}  ${forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]]}`;
};

export {showAlert, isEscapeKey, getDeclension};
