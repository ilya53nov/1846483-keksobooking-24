import { map, mainMarker, coordinateTokyo } from './map.js';
import { sendData } from './api.js';
import { showMessage } from './user-modal.js';
import { setMinValuePriceInput, onCapacityInputChange } from './user-form.js';

const advertisementForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

// Функция смены состояния элемента
const setDisabled = (element, isDisabled) => element.disabled = isDisabled;

// Функция смены состояния формы (активация, деактивация)
const switchFormState = (isDisabled, form) => {
  const classNameForm = form.className;
  form.classList.remove(classNameForm);

  if (isDisabled) {
    form.classList.add(`${classNameForm}--disabled`);
  } else {
    form.classList.add(classNameForm.replace('--disabled',''));
  }

  form.childNodes.forEach((element) => setDisabled(element, isDisabled));
};

// Функция деактивации форм
const disableForms = () => {
  switchFormState(true, advertisementForm);
  switchFormState(true, filtersForm);
};

// Функция активация формы
const activateForm = (form) => switchFormState(false, form);

// Функция возвращения страницы в начальное состояние
const initialStateForm = () => {
  advertisementForm.reset();
  filtersForm.reset();
  mainMarker.setLatLng(coordinateTokyo);
  map.closePopup();
  setMinValuePriceInput();
  onCapacityInputChange();
};

// Функция установки параметров для формы при нажатии на кнопку reset(очистки формы)
const setFormResetClick = (callback) => {
  const resetButton = advertisementForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    initialStateForm();
    callback();
  });
};

// Функция установки параметров для отправки формы на сервер
const setFormSubmit = (callback) => {
  advertisementForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        showMessage(true);
        initialStateForm();
        callback();
      },
      () => showMessage(false),
      new FormData(evt.target) ,
    );
  });
};

// Функция установки параметров при фильтрации формы
const setFilterChange = (callback) => {
  const filtersContainer = document.querySelector('.map__filters');
  filtersContainer.addEventListener('change', () => {
    callback();
  });
};

export{activateForm, disableForms, advertisementForm, filtersForm, setFilterChange, setFormResetClick, setFormSubmit};
