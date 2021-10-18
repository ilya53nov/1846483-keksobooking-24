import {
  getRandomArrayElement,
  getRandomFloatFromRange,
  getRandomIntFromRange,
  getRandomPositiveInt
} from './util.js';

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const DECIMAL_PLACES = 5;
const MAX_ROOMS = 5;
const MAX_QUESTS = 10;
const MIN_PRICE = 500;
const MAX_PRICE = 5000;
const MAX_LENGTH = 10;
const SIMILAR_ADVERTISEMENT_COUNT = 10;

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const TITLES = [
  'Ограниченное предложение',
  'Только сегодня',
  'Для спокойного отдыха',
  'Отличный вариант для молодожён',
  'Лучшее предложение для туристов',
  'Хостел',
  'Тихое место в 5-ти минутах от метро',
  'Уютное гнёздышко',
  'Агенство BestOfTheBest',
  'Агенство Friends',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const HOURS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Печеньки каждому гостю!',
  'Тихий район',
  'Новый ремонт',
  'Магазины в шаговой доступности',
  'Красивый вид из окна',
  'Отличный вариант для туристов',
  'Своя парковка',
  'Дизайнерский ремонт',
  'Дружелюбные соседи',
  'Есть всё необходимое',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Функция описания объявления
const createAdvertisement = () => {
  const lat = getRandomFloatFromRange(MIN_LAT, MAX_LAT, DECIMAL_PLACES);
  const lng = getRandomFloatFromRange(MIN_LNG, MAX_LNG, DECIMAL_PLACES);
  return {
    author:{
      avatar: AVATARS.splice(getRandomPositiveInt(AVATARS.length-1),1).join(),
    },
    offer:{
      title: TITLES.splice(getRandomPositiveInt(TITLES.length-1),1).join(),
      address: `${lat  }, ${  lng}`,
      price: getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInt(MAX_ROOMS),
      quests: getRandomPositiveInt(MAX_QUESTS),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: FEATURES.slice(getRandomPositiveInt(FEATURES.length-1)) ,
      description: DESCRIPTIONS.splice(getRandomPositiveInt(DESCRIPTIONS.length-1),1).join(),
      photos: Array.from({length: getRandomPositiveInt(MAX_LENGTH)},() => getRandomArrayElement(PHOTOS)),
    },
    location:{
      lat:  lat,
      lng:  lng,
    },
  };
};

const createAdvertisements = () => Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, createAdvertisement);

export {createAdvertisements};
