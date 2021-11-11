import { getDeclension } from './util.js';
import { types } from './data.js';

const HIDDEN_CLASS = 'hidden';

// Функция проверки значения на пустоту, если значение пусто, то скрыть элемент, если значение не пустое то вставить в элемент значение
const checkValueAndAddTextContentOrClassHidden = (element, checkValue, insertValue) => {
  if (checkValue) {
    element.textContent = insertValue;
  } else {
    element.classList.add(HIDDEN_CLASS);
  }
};

const similarAdvertisementTemlate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// Функция отрисовки похожего объявления
const renderSimilarAdvertisement = (({offer, author}) => {
  const advertisementElement = similarAdvertisementTemlate.cloneNode(true);
  const popupPrice = advertisementElement.querySelector('.popup__text--price');
  const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');
  const popupFeatures = advertisementElement.querySelector('.popup__features');
  const popupPhotos = advertisementElement.querySelector('.popup__photos');
  const popupAvatar = advertisementElement.querySelector('.popup__avatar');
  const popupTitle = advertisementElement.querySelector('.popup__title');
  const popupAddress = advertisementElement.querySelector('.popup__text--address');
  const popupType = advertisementElement.querySelector('.popup__type');
  const popupTime = advertisementElement.querySelector('.popup__text--time');
  const popupDescription = advertisementElement.querySelector('.popup__description');

  checkValueAndAddTextContentOrClassHidden(popupTitle, offer.title, offer.title);
  checkValueAndAddTextContentOrClassHidden(popupAddress, offer.address, offer.address);
  checkValueAndAddTextContentOrClassHidden(popupType, offer.type, types[offer.type].rusLocalization);
  checkValueAndAddTextContentOrClassHidden(popupTime, offer.checkin && offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  checkValueAndAddTextContentOrClassHidden(popupDescription, offer.description, offer.description);

  if (offer.price) {
    popupPrice.textContent = offer.price;
    const spanElement = document.createElement('span');
    spanElement.textContent = ' ₽/ночь';
    popupPrice.appendChild(spanElement);
  } else {
    popupPrice.classList.add(HIDDEN_CLASS);
  }

  if (offer.rooms && offer.guests) {
    const rooms = getDeclension(['комната', 'комнаты', 'комнат'], offer.rooms);
    const guests = getDeclension(['гостя', 'гостей', 'гостей'], offer.guests);
    popupCapacity.textContent = `${rooms} для ${guests}`;
  } else {
    popupCapacity.classList.add(HIDDEN_CLASS);
  }

  if (offer.features) {
    popupFeatures.innerHTML = '';

    offer.features.forEach((element) => {
      const createElementFeatures = document.createElement('li');
      createElementFeatures.className = `popup__feature popup__feature--${element}`;

      popupFeatures.appendChild(createElementFeatures);
    });
  } else {
    popupFeatures.classList.add(HIDDEN_CLASS);
  }

  if (offer.photos) {
    const photoListFragment = document.createDocumentFragment();

    offer.photos.forEach((photoItem) => {
      const photoElement = popupPhotos.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photoItem;
      photoListFragment.appendChild(photoElement);
    });

    popupPhotos.innerHTML ='';
    popupPhotos.appendChild(photoListFragment);
  } else {
    popupPhotos.classList.add(HIDDEN_CLASS);
  }

  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.classList.add(HIDDEN_CLASS);
  }

  return advertisementElement;
});

export {renderSimilarAdvertisement};
