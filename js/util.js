// Функция, возвращающая случайное число из переданного диапазона включительно
const getRandomFromRange = (from, to) => {
  const minValue = Math.min(Math.abs(from), Math.abs(to));
  const maxValue = Math.max(Math.abs(from), Math.abs(to));
  return Math.random() * (maxValue - minValue) + minValue;
};

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntFromRange = (from, to) => Math.round(getRandomFromRange(from, to));

export {getRandomIntFromRange};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloatFromRange = (from, to, decimalPlaces = 5) => +getRandomFromRange(from, to).toFixed(decimalPlaces);

export {getRandomFloatFromRange};

// Функция, возвращающая положительное случайное целое число из переданного максимального значения включительно
const getRandomPositiveInt = (maxValue) => getRandomIntFromRange(1, maxValue);

export {getRandomPositiveInt};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length-1)];

export {getRandomArrayElement};

// Функция склонения слов https://jsfiddle.net/jp6chsa2/
const declension = (forms, val) => {
  const cases = [ 2, 0, 1, 1, 1, 2 ];
  return `${val}  ${forms[(val % 100 > 4 && val % 100 < 20) ? 2 : cases[(val % 10 < 5) ? val % 10 : 5]]}`;
};

export {declension};
