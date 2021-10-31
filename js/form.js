import { map, mainMarker, coordinateTokyo } from './map.js';
import { sendData } from './api.js';
import { showMessage } from './user-modal.js';
import { clearForm } from './user-form.js';

const advertisementForm = document.querySelector('.ad-form');
//const resetButton = advertisementForm.querySelector('.ad-form__reset');

const filtersForm = document.querySelector('.map__filters');

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

const disableForms = () => switchFormState(true, advertisementForm, filtersForm);

const activateForms = (...forms) => switchFormState(false, ...forms);

const addressInput = document.querySelector('#address');

const setAddressInput = () => {
  addressInput.value = `${coordinateTokyo.lat}, ${coordinateTokyo.lng}`;
};

const initialStateForm = () => {
  clearForm();
  filtersForm.reset();
  mainMarker.setLatLng(coordinateTokyo);
  map.closePopup();
  setAddressInput();
};

advertisementForm.addEventListener('reset', (evt) => {
  evt.preventDefault();
  initialStateForm();
});

advertisementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      showMessage(true);
      initialStateForm();
    },
    () => showMessage(false),
    new FormData(evt.target) ,
  );
});

export{activateForms, disableForms, advertisementForm, filtersForm};
