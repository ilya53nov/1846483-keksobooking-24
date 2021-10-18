import {createAdvertisements} from './data.js';
import {declension} from './util.js';

const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const checkValueAndAddTextContentOrClass = (element, value) => (value) ? element.textContent = value : element.classList.add('hidden)');

const similarAdvertisementTemlate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAdvertisements = createAdvertisements();

const advertisementListFragment = document.createDocumentFragment();

similarAdvertisements.forEach(({offer, author}) => {
  const advertisementElement = similarAdvertisementTemlate.cloneNode(true);

  advertisementElement.querySelector('.popup__title').textContent = offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = offer.address;
  advertisementElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  advertisementElement.querySelector('.popup__type').textContent = TYPES[offer.type];

  const rooms = declension(['комната', 'комнаты', 'комнат'], offer.rooms);
  const quests = declension(['гостя', 'гостей', 'гостей'], offer.quests);

  advertisementElement.querySelector('.popup__text--capacity').textContent = `${rooms} для ${quests}`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = advertisementElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  offer.features.forEach((element) => {
    const createElementFeatures = document.createElement('li');
    createElementFeatures.classList.add('popup__feature');
    createElementFeatures.classList.add(`popup__feature--${element}`);
    featuresContainer.appendChild(createElementFeatures);
  });

  checkValueAndAddTextContentOrClass(advertisementElement.querySelector('.popup__description'), offer.description);

  const photoContainer = advertisementElement.querySelector('.popup__photos');
  const photoListFragment = document.createDocumentFragment();

  offer.photos.forEach((photoItem) => {
    const photoElement = photoContainer.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photoItem;
    photoListFragment.appendChild(photoElement);
  });

  photoContainer.innerHTML ='';
  photoContainer.appendChild(photoListFragment);

  advertisementElement.querySelector('.popup__avatar').src = author.avatar;
  advertisementListFragment.appendChild(advertisementElement);
});

export {advertisementListFragment};
