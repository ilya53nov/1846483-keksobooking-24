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
  'Бунгало' : 0,
  'Квартира' : 1000,
  'Отель' : 3000,
  'Дом' : 5000,
  'Дворец' : 10000,
};

const getMinPrice = () => rulesMinPrice[typeInput.selectedOptions[0].text];

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
  priceInput.min = getMinPrice();
  priceInput.placeholder = getMinPrice();
  onPriceInputChange();
};

typeInput.addEventListener('input', onTypeInputChange);

priceInput.addEventListener('input', onPriceInputChange);

// Валидация поля "Количество комнат и количество мест"
const roomInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const rulesCapacityInput = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
  '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
  '100 комнат': ['не для гостей'],
};

const isValidCapacityInput = () => rulesCapacityInput[roomInput.selectedOptions[0].text].some((element) => element === capacityInput.selectedOptions[0].text);

const createMessageCustomValidity = () => `Не верно указано количество мест, необходимо выбрать: ${rulesCapacityInput[roomInput.selectedOptions[0].text].join(' или ')}.`;

const onOptionChange = () => {
  if (!isValidCapacityInput()) {
    capacityInput.setCustomValidity(createMessageCustomValidity());
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
};

capacityInput.addEventListener('change', onOptionChange);
roomInput.addEventListener('change', onOptionChange);

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

const form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {
  //Добавление временного значения в поле адрес (для успешной отправки формы)
  addressInput.value = '55.55';

  if (!isValidCapacityInput()) {
    onOptionChange();
    evt.preventDefault();
    return false;
  }
});
