import {renderSimilarList} from './similar-list.js';
import {activateForms, disableForms} from './form.js';
import './form-validation.js';

//disableForms();

const similarElement = document.querySelector('#map-canvas');

similarElement.appendChild(renderSimilarList.firstChild);
