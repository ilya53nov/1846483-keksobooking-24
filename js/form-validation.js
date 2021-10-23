import { declension } from './util.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

// Валидация поля "Заголовок объявления"
const titleInput = document.querySelector('#title');

titleInput.addEventListener('input',() => {
  const valueLength = titleInput.value.length;

  if(valueLength < MIN_TITLE_LENGTH){
    titleInput.setCustomValidity(`Ёще ${declension(['символ', 'символа', 'символов'], MIN_TITLE_LENGTH - valueLength)}`);
  } else if (valueLength > MAX_TITLE_LENGTH){
    titleInput.setCustomValidity(`Удалите лишние ${declension(['символ', 'символа', 'символов'],valueLength - MAX_TITLE_LENGTH)}`);
  } else{
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Валидация поля "Цена за ночь"
const priceInput = document.querySelector('#price');

priceInput.addEventListener('input', () => {
  const value = priceInput.value;

  if(value > MAX_PRICE_VALUE){
    priceInput.setCustomValidity(`Указанное значение больше максимального, максимальное: ${MAX_PRICE_VALUE}`);
  }else{
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// Валидация поля "Количество комнат и количество мест"

const roomInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const rules = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const isValidCapacityInput = () => {
  if(rules[roomInput.value].some((element) =>  element === capacityInput.value)){
    return true;
  }else{
    return false;
  }
};

const createMessageCustomValidity = () => {
  let messageError = 'Не верно указано количество мест, необходимо выбрать: ';
  rules[roomInput.value].forEach((element) => {
    if(element === '0'){
      messageError += 'не для гостей';
    }else{
      if(rules[roomInput.value].indexOf(element) > 0){
        messageError += ' или ';
      }
      messageError += `для ${declension(['гостя', 'гостей', 'гостей'], element)}`;
    }
  });
  return `${messageError}.`;
};

const onOptionChange = () => {
  if (!isValidCapacityInput()){
    capacityInput.setCustomValidity(createMessageCustomValidity());
  }else{
    capacityInput.setCustomValidity('');
  }
  capacityInput.reportValidity();
};

capacityInput.addEventListener('change', onOptionChange);

roomInput.addEventListener('change', onOptionChange);

const form = document.querySelector('.ad-form');

const addressInput = document.querySelector('#address');

form.addEventListener('submit', (evt) => {
  //Добавление временного значения в поле адрес (для успешной отправки формы)
  addressInput.value = '55.55';

  if(!isValidCapacityInput()){
    onOptionChange();
    evt.preventDefault();
    return false;
  }
});
