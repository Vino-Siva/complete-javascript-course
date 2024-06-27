'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////

const renderCountry = function (data, className = '') {
  const [currencyObj] = Object.values(data.currencies);
  const currency = Object.values(currencyObj).join(', ');
  const [languages] = Object.values(data.languages).join(', ');
  // console.log(language);
  // console.log(currency);
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${languages}</p>
          <p class="country__row"><span>💰</span>${currency}</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = msg =>
  countriesContainer.insertAdjacentText('beforeend', msg);

const whereAmI = function (lat, long) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(response => {
      if (response.status === 403)
        throw new Error(
          `Whoa!😕Too many requests! Wait, are you trying to bankrupt me?🤨 (${response.status})`
        );
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.com/v3.1/alpha/${data.prov}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(
          `😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽 (${response.status})`
        );
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err.message);
      renderError(`OOPS! ${err.message}. Please try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
