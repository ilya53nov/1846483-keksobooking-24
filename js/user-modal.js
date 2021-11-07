import { isEscapeKey } from './util.js';

const successMessageTemlate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorMessageTemlate = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = successMessageTemlate.cloneNode(true);

const errorMessage = errorMessageTemlate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

// Событие при клике
const onMessageClick = () =>{
  closeMessage();
};

// Событие при нажатой клавише Esc
const onPopupEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

// Функция скрытия сообщения
function closeMessage () {
  if (document.body.lastChild === errorMessage) {
    errorMessage.remove();
    errorButton.removeEventListener('click', onMessageClick);
  } else if (document.body.lastChild === successMessage) {
    successMessage.remove();
  }
  document.removeEventListener('keydown', onPopupEscKeyDown);
  document.removeEventListener('click', onMessageClick);
}

// Функция показа сообщения, принимает булево значение
const showMessage = (isSuccess) => {
  if (isSuccess) {
    document.body.appendChild(successMessage);
  } else {
    document.body.appendChild(errorMessage);
    errorButton.addEventListener('click', onMessageClick);
  }
  document.addEventListener('keydown', onPopupEscKeyDown);
  document.addEventListener('click', onMessageClick);
};

export {showMessage};
