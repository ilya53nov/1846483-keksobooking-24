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
const MAX_PRICE = 50000;
const MAX_LENGTH = 10;

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
  '1-к. квартира',
  '2-к. квартира',
  '3-к. квартира',
  '4-к. квартира',
  '5-к. квартира',
  'Дом 100 кв. м.',
  'Дом 150 кв. м.',
  'Дом 200 кв. м.',
  'Дом 250 кв. м.',
  'Дом 300 кв. м.',
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
  'Лучшее предложение в центре города с 2 раздельными спальными местами или для 1 пары! Имеется свободное парковочное место во дворе дома',
  'Лучшее предложение в центре города с 6 раздельными спальными местами или для 3 пар! Каждому гостю 2 полотенца: Для душа, для рук и лица.',
  'Новый ремонт, выглаженное постельное белье и полотенца! Рядом продуктовые магазины, кафе, рестораны, бары, кинотеатр, ТЦ, остановки общественного транспорта.',
  'От собственника в новом доме в центре города. Есть возможность курения, но только на балконе с закрытой дверью.',
  'Тепло и уютно. Предоставляем постельное белье и махровые полотенца. Одноразовые мыло, шампунь, гели и тапочки уже входят в стоимость проживания.',
  'Для гостей нашего города предлагаем замечательный вариант. Квартира в новом доме, улучшенной планировки, спокойные соседи, лифт, окна с видом на реку.',
  'Если вы любите чистоту и комфорт - вам сюда. Всегда свежее постельное белье и полотенца.',
  'Дизайнерский ремонт, чистая, аккуратная, уютная и солнечная. ОГРОМНАЯ ВАННА - джакузи.',
  'Сдается в тихом центре, в новом многоэтажном комплексе состоящем из 5 домов расположенном в 5 минутах езды на машине от центра города.',
  'Евроремонт, современная система вентиляции, двуспальная кровать. Окна во двор, на окнах установлены москитные сетки.',
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
      avatar: AVATARS.splice(0,1).join(),
    },
    offer:{
      title: TITLES.splice(0,1).join(),
      address: `${lat  }, ${  lng}`,
      price: getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInt(MAX_ROOMS),
      quests: getRandomPositiveInt(MAX_QUESTS),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: FEATURES.slice(getRandomPositiveInt(FEATURES.length-1)) ,
      description: DESCRIPTIONS.splice(0,1).join(),
      photos: Array.from({length: getRandomPositiveInt(MAX_LENGTH)},() => getRandomArrayElement(PHOTOS)),
    },
    location:{
      lat:  lat,
      lng:  lng,
    },
  };
};

export {createAdvertisement};
