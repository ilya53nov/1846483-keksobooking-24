import { getDeclension } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const rulesMinPrice = {
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

const rulesCapacityInput = {
  '1': ['для 1 гостя'],
  '2': ['для 1 гостя', 'для 2 гостей'],
  '3': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100': ['не для гостей'],
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

const getMinPrice = () => rulesMinPrice[typeInput.value];
const isValidCapacityInput = () => rulesCapacityInput[roomInput.value].some((element) => element === capacityInput.selectedOptions[0].text);

titleInput.addEventListener('input', onTitleInputChange);
typeInput.addEventListener('input', onTypeInputChange);
priceInput.addEventListener('input', onPriceInputChange);
capacityInput.addEventListener('change', onCapacityInputChange);
roomInput.addEventListener('change', onCapacityInputChange);
timeInInput.addEventListener('change', onTimeInInputChange);
timeOutInput.addEventListener('change', onTimeOutInputChange);

const setMinValuePriceInput = () => {
  priceInput.min = getMinPrice();
  priceInput.placeholder = getMinPrice();
};

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

function onPriceInputChange () {
  const value = priceInput.value;

  if (value < getMinPrice()) {
    priceInput.setCustomValidity(`Не верно указана цена для типа жилья "${typeInput.selectedOptions[0].text}", минимальая цена: ${getMinPrice()}`);
  } else if (value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Указанное значение больше максимального, максимальное: ${MAX_PRICE_VALUE}`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
}

function onCapacityInputChange () {
  if (!isValidCapacityInput()) {
    capacityInput.setCustomValidity(`Не верно указано количество мест, необходимо выбрать: ${rulesCapacityInput[roomInput.value].join(' или ')}.`);
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
}

function onTypeInputChange () {
  setMinValuePriceInput();
  onPriceInputChange();
}

setMinValuePriceInput();
onCapacityInputChange();

function onTimeInInputChange() {
  timeOutInput.value = timeInInput.value;
}

function onTimeOutInputChange() {
  timeInInput.value = timeOutInput.value;
}

export {addressInput, onCapacityInputChange};
