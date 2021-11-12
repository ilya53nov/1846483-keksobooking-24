import { getDeclension } from './util.js';
import { types } from './data.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MESSAGE_ERROR_CAPACITY_INPUT = 'Не верно указано количество мест, необходимо выбрать:';

// Правила для полей 'количество комнат' : 'количество мест'
const rulesCapacityInput = {
  1: {
    values: [1],
    messageError: function() { return `${MESSAGE_ERROR_CAPACITY_INPUT} для ${this.values.join()} гостя.`; },
  },
  2: {
    values: [1, 2],
    messageError: function() { return `${MESSAGE_ERROR_CAPACITY_INPUT} для ${this.values.join(' или ')} гостей.`; },
  },
  3: {
    values: [1, 2, 3],
    messageError: function() { return `${MESSAGE_ERROR_CAPACITY_INPUT} для ${this.values.join(' или ')} гостей.`; },
  },
  100: {
    values: [0],
    messageError: function() { return `${MESSAGE_ERROR_CAPACITY_INPUT} не для гостей.`; },
  },
};

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeInput = document.querySelector('#type');
const roomInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');
const addressInput = document.querySelector('#address');
const avatarInput = document.querySelector('#avatar');
const imagesInput = document.querySelector('#images');

imagesInput.accept = 'image/*';
avatarInput.accept = 'image/*';
addressInput.readOnly = true;

// Функция для изменения значения в поле 'адрес'
const setAddressInput = (value) => addressInput.value = value;

// Функция для возвращения минимальной стоимости по переданному типу жилья
const getMinPrice = (type) => types[type].minPrice;

// Функция проверки валидности поля 'количество мест'
const isValidCapacityInput = () => rulesCapacityInput[roomInput.value].values.some((element) => element.toString() === capacityInput.value.toString());

// Функция для установки минимальной цены
const setMinValuePriceInput = () => {
  const minPrice = getMinPrice(typeInput.value);
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};

// Обработчик для поля 'заголовок объявления'
function onTitleInputChange() {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ёще ${getDeclension(['символ', 'символа', 'символов'], MIN_TITLE_LENGTH - valueLength)}`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${getDeclension(['символ', 'символа', 'символов'],valueLength - MAX_TITLE_LENGTH)}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
}

// Обработчик для поля 'цена за ночь'
function onPriceInputChange () {
  const value = priceInput.value;
  const minValue = getMinPrice(typeInput.value);

  if (value < minValue) {
    priceInput.setCustomValidity(`Не верно указана цена для типа жилья "${types[typeInput.value].rusLocalization}", минимальая цена: ${minValue}`);
  } else if (value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Указанное значение больше максимального, максимальное: ${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

// Обработчик для поля 'количество мест'
function onCapacityInputChange () {
  if (!isValidCapacityInput()) {
    capacityInput.setCustomValidity(rulesCapacityInput[roomInput.value].messageError());
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
}

// Обработчик для поля 'тип жилья'
function onTypeInputChange () {
  setMinValuePriceInput();
  onPriceInputChange();
}

// Обработчик для поля 'время заезда'
function onTimeInInputChange() {
  timeOutInput.value = timeInInput.value;
}

// Обработчик для поля 'время выезда'
function onTimeOutInputChange() {
  timeInInput.value = timeOutInput.value;
}

// Функция добавления слушателей на поля
const setEventListenerInputs = () => {
  titleInput.addEventListener('input', onTitleInputChange);
  typeInput.addEventListener('input', onTypeInputChange);
  priceInput.addEventListener('input', onPriceInputChange);
  capacityInput.addEventListener('change', onCapacityInputChange);
  roomInput.addEventListener('change', onCapacityInputChange);
  timeInInput.addEventListener('change', onTimeInInputChange);
  timeOutInput.addEventListener('change', onTimeOutInputChange);
  setMinValuePriceInput();
  onCapacityInputChange();
};

export {setAddressInput, setEventListenerInputs, setMinValuePriceInput, onCapacityInputChange};
