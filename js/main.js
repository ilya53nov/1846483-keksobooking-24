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

// Функция, возвращающая случайное число из переданного диапазона включительно
function getRandomFromRange(from, to){
  return Math.random() * (to - from) + from;
}

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntFromRange = function(from, to){
  if (from >= 0 && to > from){
    return Math.round(getRandomFromRange(from, to));
  }
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloatFromRange = function(from, to, decimalPlaces){
  if (from >= 0 && to > from){
    return +getRandomFromRange(from, to).toFixed(decimalPlaces);
  }
};

const createAdvertisement = () => ({
  author:{
    avatar: AVATARS.splice(0,1),
  },
  location:{
    lat:  getRandomFloatFromRange(35.65000, 35.70000, 5),
    lng:  getRandomFloatFromRange(139.70000, 139.80000, 5),
  },
  offer:{
    title: TITLES.splice(0,1),
    address: `${getRandomFloatFromRange(35.65000, 35.70000, 5)  }, ${  getRandomFloatFromRange(139.70000, 139.80000, 5)}`,
    price: getRandomIntFromRange(500, 50000),
    type: TYPES[getRandomIntFromRange(0,TYPES.length-1)],
    rooms: getRandomIntFromRange(1, 4),
    quests: getRandomIntFromRange(1, 10),
    checkin: HOURS[getRandomIntFromRange(0,HOURS.length-1)],
    checkout: HOURS[getRandomIntFromRange(0,HOURS.length-1)],
    features: FEATURES.slice(getRandomIntFromRange(0,FEATURES.length-1),getRandomIntFromRange(0,FEATURES.length-1)) ,
    description:DESCRIPTIONS.splice(0,1),
    photos: Array.from({length: getRandomIntFromRange(1,10)},() => PHOTOS[getRandomIntFromRange(0,PHOTOS.length-1)]),
  },

});

const similarAdvertisements = Array.from({length: 10}, createAdvertisement);
