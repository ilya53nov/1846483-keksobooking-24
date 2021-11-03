import {getDeclension} from './util.js';

const HIDDEN_CLASS = 'hidden';

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

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

const renderSimilarAdvertisement = (({offer, author}) => {
  const advertisementElement = similarAdvertisementTemlate.cloneNode(true);

  checkValueAndAddTextContentOrClassHidden(advertisementElement.querySelector('.popup__title'), offer.title, offer.title);
  checkValueAndAddTextContentOrClassHidden(advertisementElement.querySelector('.popup__text--address'), offer.address, offer.address);
  checkValueAndAddTextContentOrClassHidden(advertisementElement.querySelector('.popup__type'), offer.type, TYPES[offer.type]);
  checkValueAndAddTextContentOrClassHidden(advertisementElement.querySelector('.popup__text--time'), offer.checkin && offer.checkout, `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  checkValueAndAddTextContentOrClassHidden(advertisementElement.querySelector('.popup__description'), offer.description, offer.description);

  if (offer.price) {
    advertisementElement.querySelector('.popup__text--price').textContent = offer.price;
    const spanElement = document.createElement('span');
    spanElement.textContent = ' ₽/ночь';
    advertisementElement.querySelector('.popup__text--price').appendChild(spanElement);
  } else {
    advertisementElement.querySelector('.popup__text--price').classList.add(HIDDEN_CLASS);
  }

  if (offer.rooms && offer.guests) {
    const rooms = getDeclension(['комната', 'комнаты', 'комнат'], offer.rooms);
    const guests = getDeclension(['гостя', 'гостей', 'гостей'], offer.guests);
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${rooms} для ${guests}`;
  } else {
    advertisementElement.querySelector('.popup__text--capacity').classList.add(HIDDEN_CLASS);
  }

  if (offer.features) {
    const featuresContainer = advertisementElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';

    offer.features.forEach((element) => {
      const createElementFeatures = document.createElement('li');
      createElementFeatures.classList.add('popup__feature');
      createElementFeatures.classList.add(`popup__feature--${element}`);
      featuresContainer.appendChild(createElementFeatures);
    });
  } else {
    advertisementElement.querySelector('.popup__features').classList.add(HIDDEN_CLASS);
  }

  if (offer.photos) {
    const photoContainer = advertisementElement.querySelector('.popup__photos');
    const photoListFragment = document.createDocumentFragment();

    offer.photos.forEach((photoItem) => {
      const photoElement = photoContainer.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = photoItem;
      photoListFragment.appendChild(photoElement);
    });

    photoContainer.innerHTML ='';
    photoContainer.appendChild(photoListFragment);
  } else {
    advertisementElement.querySelector('.popup__photos').classList.add(HIDDEN_CLASS);
  }

  if (author.avatar) {
    advertisementElement.querySelector('.popup__avatar').src = author.avatar;
  } else {
    advertisementElement.querySelector('.popup__avatar').classList.add(HIDDEN_CLASS);
  }

  return advertisementElement;
});

export {renderSimilarAdvertisement};
