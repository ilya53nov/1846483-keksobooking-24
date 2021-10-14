// Функция, возвращающая случайное число из переданного диапазона включительно
const getRandomFromRange = (from, to) => Math.random() * (to - from) + from;

// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomIntFromRange = (from, to) => {
  const min = Math.min(Math.abs(from), Math.abs(to));
  const max = Math.max(Math.abs(from), Math.abs(to));
  return Math.round(getRandomFromRange(min, max));
};

export {getRandomIntFromRange};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloatFromRange = (from, to, decimalPlaces = 5) => {
  const min = Math.min(Math.abs(from), Math.abs(to));
  const max = Math.max(Math.abs(from), Math.abs(to));
  return +getRandomFromRange(min, max).toFixed(decimalPlaces);
};

export {getRandomFloatFromRange};

// Функция, возвращающая положительное случайное целое число из переданного максимального значения включительно
const getRandomPositiveInt = (maxValue) =>  Math.round(Math.random() * (maxValue - 1) + 1);

export {getRandomPositiveInt};

// Функция, возвращающая случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length-1)];

export {getRandomArrayElement};
