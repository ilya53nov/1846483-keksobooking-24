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
