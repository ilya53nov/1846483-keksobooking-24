import {renderSimilarAdvertisement} from './similar-list.js';
import {createAdvertisements} from './data.js';
import {activateForms, disableForms} from './form.js';
import './form-validation.js';
import {addressInput} from './form-validation.js';

disableForms();

const coordinateTokyo = {
  lat: 35.68950,
  lng: 139.69200,
};

addressInput.value = `${coordinateTokyo.lat}, ${coordinateTokyo.lng}`;

const mapCanvas = document.querySelector('#map-canvas');

const map = L.map(mapCanvas)
  .on('load', () => {
    activateForms();
  })
  .setView(coordinateTokyo, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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

const mainMarker = L.marker(
  {
    lat: coordinateTokyo.lat,
    lng: coordinateTokyo.lng,
  },
  {
    icon: mainPinIcon,
    draggable: true,
  },
).addTo(map);

const createMarker = (element) => {
  const marker = L.marker(element.location, icon)
    .addTo(map)
    .bindPopup(renderSimilarAdvertisement(element))
    .on('click', () => marker.openPopup());
};

const similarAdvertisements = createAdvertisements();

similarAdvertisements.forEach((element) => {
  createMarker(element);
});

const currentCoordinate = (evt) => evt.target.getLatLng();

const setValueAddressInput = (evt) => {
  addressInput.value = `${currentCoordinate(evt).lat.toFixed(5)}, ${currentCoordinate(evt).lng.toFixed(5)}`;
};

mainMarker.on('moveend', setValueAddressInput);
