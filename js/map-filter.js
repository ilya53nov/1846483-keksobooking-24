const ADS_COUNT = 10;

const rulesPriceFilter = {
  middle : {
    min : 10000,
    max : 50000,
  },
  low : {
    min : 0,
    max : 10000 - 1,
  },
  high : {
    min : 50000 + 1,
    max : Infinity,
  },
};

const isAny = (value) => value === 'any';

const isFilterPrice = (value, priceFilter) => isAny(priceFilter) || value >= rulesPriceFilter[priceFilter].min && value <= rulesPriceFilter[priceFilter].max;

const isEqualElementToValue = (element, value) => isAny(value) || element.toString() === value.toString();

const isFilterFeatures = (features, filterFeatures) => features && filterFeatures.every((feature) => features.some((featureValue) => feature === featureValue));

// Функция сортировки массива по количеству особенностей
const sortFeature = (elements) => {
  elements.sort((current, next) => {
    let currentValue = 0;
    let nextValue = 0;

    if (current.offer.features) {
      currentValue = current.offer.features.length;
    }
    if (next.offer.features) {
      nextValue = next.offer.features.length;
    }
    return nextValue - currentValue;
  });
};

// Функция получения отфильтрованного массива
const getFilteredAds = (elements, typeValue, priceValue, roomsValue, guestsValue, features) => {
  sortFeature(elements);

  const filteredElements = [];

  for (let i = 0; i < elements.length; i++) {
    if (filteredElements.length === ADS_COUNT) {
      break;
    } else if (isEqualElementToValue(elements[i].offer.type, typeValue) && isFilterPrice(elements[i].offer.price, priceValue) && isEqualElementToValue(elements[i].offer.rooms, roomsValue) && isEqualElementToValue(elements[i].offer.guests, guestsValue) && isFilterFeatures(elements[i].offer.features, features)) {
      filteredElements.push(elements[i]);
    }
  }

  return filteredElements;
};

export {getFilteredAds};
