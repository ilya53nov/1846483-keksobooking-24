import { createMarker } from './map.js';
const ADS_COUNT = 10;

const rulesPriceFilter = {
  'middle' : {
    'min' :  10000,
    'max' : 50000,
  },
  'low' : {
    'min' : 0,
    'max' : 10000 - 1,
  },
  'high' : {
    'min' : 50000 + 1,
    'max' : Infinity,
  },
};

const filterPrice = (elements, priceValue) => {
  const isFilterPrice = (value) => (value >= rulesPriceFilter[priceValue].min && value <= rulesPriceFilter[priceValue].max);

  return elements.filter((element) => isFilterPrice(element.offer.price));
};

const filterType = (elements, typeValue) => elements.filter((element) => {
  if (element.offer.type) {
    return element.offer.type === typeValue;
  }
});

const filterRooms = (elements, roomsValue) => elements.filter((element) => {
  if (element.offer.rooms) {
    return element.offer.rooms === +roomsValue;
  }
});

const filterGuests = (elements, guestsValue) => elements.filter((element) => {
  if (element.offer.guests) {
    return element.offer.guests === +guestsValue;
  }
});

const filterFeatures = (elements, features) => elements.filter((element) => {
  if (element.offer.features) {
    return features.every((feature) => element.offer.features.some((featureValue) => feature === featureValue));
  }
  return false;
});

const sortFeature = (elements) => {
  elements.sort((current, next) => next.offer.features.length - current.offer.features.length);
};

const isAny = (value) => value === 'any';

const filterMapMarkers = (elements, typeValue, priceValue, roomsValue, guestsValue, features) => {
  if (!isAny(typeValue)) {
    elements = filterType(elements, typeValue);
  }
  if (!isAny(priceValue)) {
    elements = filterPrice(elements, priceValue);
  }
  if (!isAny(roomsValue)) {
    elements = filterRooms(elements, roomsValue);
  }
  if (!isAny(guestsValue)) {
    elements = filterGuests(elements, guestsValue);
  }
  if (features) {
    elements = filterFeatures(elements, features);
  }

  sortFeature(elements);

  elements = elements.slice(0, ADS_COUNT);
  elements.forEach((element) => createMarker(element));
};

export {filterMapMarkers};
