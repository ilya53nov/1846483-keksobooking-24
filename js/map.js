import { activateForms, advertisementForm, filtersForm, setFilterChange, setFormResetClick, setFormSubmit } from './form.js';
import { renderSimilarAdvertisement } from './similar-list.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { addressInput } from './user-form.js';
import { filterMapMarkers } from './map-filter.js';
import { debounce } from './utils/debounce.js';

const coordinateTokyo = {
  lat: '35.68950',
  lng: '139.69200',
};

const mapCanvas = document.querySelector('#map-canvas');
const filtersContainer = document.querySelector('.map__filters');
const map = L.map(mapCanvas);

const layerGroup = L.layerGroup();

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAncor: [26, 52],
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAncor: [20, 40],
});

const currentCoordinate = (evt) => evt.target.getLatLng();

const setValueAddressInput = (evt) => {
  addressInput.value = `${currentCoordinate(evt).lat.toFixed(5)}, ${currentCoordinate(evt).lng.toFixed(5)}`;
};

const createMarker = (element) => {

  const marker = L.marker(element.location, icon)
    .addTo(layerGroup)
    .bindPopup(renderSimilarAdvertisement(element))
    .on('click', () => marker.openPopup());
};

const mainMarker = L.marker(coordinateTokyo,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

const getValueCheckboxFeatures = () => {
  const housingFeatures = filtersContainer.querySelectorAll('.map__checkbox');
  const features = [];

  housingFeatures.forEach((element) => {
    if (element.checked) {
      features.push(element.value);
    }
  });
  return features;
};

const renderMarkers = (elements) => {
  const housingType = filtersContainer.querySelector('#housing-type');
  const housingPrice = filtersContainer.querySelector('#housing-price');
  const housingRooms = filtersContainer.querySelector('#housing-rooms');
  const housingGuests = filtersContainer.querySelector('#housing-guests');

  layerGroup.clearLayers();

  filterMapMarkers(elements, housingType.value, housingPrice.value, housingRooms.value, housingGuests.value, getValueCheckboxFeatures());

  activateForms(filtersForm);
};

const onMapLoad = () => {
  activateForms(advertisementForm);

  getData((items) => {
    renderMarkers(items),
    setFormSubmit( () => renderMarkers(items)),
    setFormResetClick( () => renderMarkers(items)),
    setFilterChange(debounce( () => renderMarkers(items)));
  }, (err) => {
    showAlert(err),
    setFormSubmit(() => false);
  },
  );
};

const createMap = () => {
  map
    .on('load', () => {
      onMapLoad();
    })
    .setView(coordinateTokyo, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  layerGroup.addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('move', setValueAddressInput);

  addressInput.value = `${coordinateTokyo.lat}, ${coordinateTokyo.lng}`;
};

export {map, mainMarker, coordinateTokyo, createMap, createMarker, onMapLoad };
