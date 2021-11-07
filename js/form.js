import { map, mainMarker, coordinateTokyo } from './map.js';
import { sendData } from './api.js';
import { showMessage } from './user-modal.js';

const advertisementForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

// Функция смены состояния форм (активация, деактивация)
const switchFormState = (isDisabled, ...forms) => {
  forms.forEach((form) => {
    const classNameForm = form.className;
    form.classList.remove(classNameForm);

    if (isDisabled) {
      form.classList.add(`${classNameForm}--disabled`);
    } else {
      form.classList.add(classNameForm.replace('--disabled',''));
    }

    form.childNodes.forEach((element) => element.disabled = isDisabled);
  });
};

// Функция деактивация форм
const disableForms = () => switchFormState(true, advertisementForm, filtersForm);

// Функция активация форм
const activateForms = (...forms) => switchFormState(false, ...forms);

// Функция возвращения страницы в начальное состояние
const initialStateForm = () => {
  advertisementForm.reset();
  filtersForm.reset();
  mainMarker.setLatLng(coordinateTokyo);
  map.closePopup();
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

export{activateForms, disableForms, advertisementForm, filtersForm, setFilterChange, setFormResetClick, setFormSubmit};
