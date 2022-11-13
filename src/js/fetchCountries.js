import { Notify } from 'notiflix/build/notiflix-notify-aio';

const LIMIT = 10;

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(res => {
      if (res.status !== 404) return res.json();
      showError();
      return [];
    })
    .then(data => {
      if (data.length > LIMIT)
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

      return data;
    });
}

function showError() {
  Notify.failure('Oops, there is no country with that name');
}
