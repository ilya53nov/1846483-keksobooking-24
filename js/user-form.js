import { getDeclension } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

// Валидация поля "Заголовок объявления"
const titleInput = document.querySelector('#title');

const onTitleInputChange = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ёще ${getDeclension(['символ', 'символа', 'символов'], MIN_TITLE_LENGTH - valueLength)}`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${getDeclension(['символ', 'символа', 'символов'],valueLength - MAX_TITLE_LENGTH)}`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
};

titleInput.addEventListener('input', onTitleInputChange);

// Валидация поля "Цена за ночь"
const priceInput = document.querySelector('#price');
const typeInput = document.querySelector('#type');

const rulesMinPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

const getMinPrice = () => rulesMinPrice[typeInput.value];

const setMinValuePriceInput = () => {
  priceInput.min = getMinPrice();
  priceInput.placeholder = getMinPrice();
};

setMinValuePriceInput();

const onPriceInputChange = () => {
  const value = priceInput.value;

  if (value < getMinPrice()) {
    priceInput.setCustomValidity(`Не верно указана цена для типа жилья "${typeInput.selectedOptions[0].text}", минимальая цена: ${getMinPrice()}`);
  } else if (value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Указанное значение больше максимального, максимальное: ${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
};

const onTypeInputChange = () => {
  setMinValuePriceInput();
  onPriceInputChange();
};

typeInput.addEventListener('input', onTypeInputChange);

priceInput.addEventListener('input', onPriceInputChange);

// Валидация поля "Количество комнат и количество мест"
const roomInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const rulesCapacityInput = {
  '1': ['для 1 гостя'],
  '2': ['для 1 гостя', 'для 2 гостей'],
  '3': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100': ['не для гостей'],
};

const isValidCapacityInput = () => rulesCapacityInput[roomInput.value].some((element) => element === capacityInput.selectedOptions[0].text);

const createMessageCustomValidity = () => `Не верно указано количество мест, необходимо выбрать: ${rulesCapacityInput[roomInput.value].join(' или ')}.`;

const onCapacityInputChange = () => {
  if (!isValidCapacityInput()) {
    capacityInput.setCustomValidity(createMessageCustomValidity());
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
};

onCapacityInputChange();

capacityInput.addEventListener('change', onCapacityInputChange);
roomInput.addEventListener('change', onCapacityInputChange);

// Валидация полей "Время заезда", "Время выезда"
const timeInInput = document.querySelector('#timein');
const timeOutInput = document.querySelector('#timeout');

const onTimeInInputChange = () => timeOutInput.value = timeInInput.value;
const onTimeOutInputChange = () => timeInInput.value = timeOutInput.value;

timeInInput.addEventListener('input', onTimeInInputChange);
timeOutInput.addEventListener('input', onTimeOutInputChange);

// Валидация поля адрес
const addressInput = document.querySelector('#address');
addressInput.readOnly = true;

// Валидация полей загрузки фото
const avatarInput = document.querySelector('#avatar');
avatarInput.accept = 'image/*';

const imagesInput = document.querySelector('#images');
imagesInput.accept = 'image/*';

const descriptionInput = document.querySelector('#description');

const clearForm = () => {
  titleInput.value = '';
  addressInput.value = '';
  priceInput.value = '';
  descriptionInput.value = '';

  const featuresCheckbox = document.querySelectorAll('.features__checkbox');
  featuresCheckbox.forEach((element) => element.checked = false);
};

export {addressInput, onCapacityInputChange, clearForm};
