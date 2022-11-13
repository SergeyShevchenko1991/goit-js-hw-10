import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const fetchCountriesDebounce = debounce(function (evt) {
  fetchCountries(evt.target.value.trim()).then(data => {
    if (!data) return;
    if (data.length === 1) {
      return renderCountryInfo(data[0]);
    }
    renderList(data);
  });
}, DEBOUNCE_DELAY);

searchBox.addEventListener('input', fetchCountriesDebounce);

function renderList(countries) {
  let fragment = '';

  for (const country of countries) {
    fragment += getTemplateCountry(country);
  }
  countryInfo.innerHTML = '';
  list.innerHTML = '';
  list.insertAdjacentHTML('afterbegin', fragment);
}

function renderCountryInfo(aCountry) {
  let fragment = getTemplateCountryInfo(aCountry);

  countryInfo.innerHTML = '';
  list.innerHTML = '';
  countryInfo.insertAdjacentHTML('afterbegin', fragment);
}

function getTemplateCountry({ name, flags }) {
  return `
    <li>
        <img src="${flags.svg}" width="40">
        <span>${name.official}</span>
    </li>`;
}

function getTemplateCountryInfo(aCountry) {
  const languages = Object.values(aCountry.languages);

  return `<h2><img src="${aCountry.flags.svg}" width="40" alt="" />${
    aCountry.name.official
  }</h2>
    <ul class="country-info__details">
      <li><span>Capital:</span>${aCountry.capital[0]}</li>
      <li><span>Population:</span>${aCountry.population}</li>
      <li><span>Languages:</span>${languages.join(', ')}</li>
    </ul>`;
}
