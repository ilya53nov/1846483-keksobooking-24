import {advertisementListFragment} from './popup.js';
import {activateForms, disableForms} from './form.js';

activateForms();

const similarElement = document.querySelector('#map-canvas');

similarElement.appendChild(advertisementListFragment.firstChild);
