import { activateForms, advertisementForm, filtersForm } from './form.js';
import { renderSimilarAdvertisement } from './similar-list.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { addressInput } from './user-form.js';

const coordinateTokyo = {
  lat: 35.68950,
  lng: 139.69200,
};

const mapCanvas = document.querySelector('#map-canvas');
const map = L.map(mapCanvas);

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
    .addTo(map)
    .bindPopup(renderSimilarAdvertisement(element))
    .on('click', () => marker.openPopup());
};

const mainMarker = L.marker(coordinateTokyo,
  {
    icon: mainPinIcon,
    draggable: true,
  },
);

const renderMarkers = (elements) => {
  elements.forEach((element) => createMarker(element));
  activateForms(filtersForm);
};

const onMapLoad = () => {
  activateForms(advertisementForm);
  getData(renderMarkers, showAlert);
};

const createMap = () => {
  map
    .on('load', () => {
      onMapLoad();
    })
    .setView(coordinateTokyo, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('move', setValueAddressInput);
  addressInput.value = `${coordinateTokyo.lat}, ${coordinateTokyo.lng}`;
};

export {map, mainMarker, coordinateTokyo, createMap};
