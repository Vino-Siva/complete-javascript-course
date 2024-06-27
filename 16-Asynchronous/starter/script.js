'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://restcountries.com/v3.1/name/${country}?fullText=true`
//   );
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flag}" />
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.region}</h4>
//           <p class="country__row"><span>👫</span>${(
//             +data.population / 1000000
//           ).toFixed(1)} million people</p>
//           <p class="country__row"><span>🗣️</span>${data.languages.tam}</p>
//           <p class="country__row"><span>💰</span>${data.currencies.INR.name}</p>
//         </div>
//       </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };
// getCountryData('india');
// // getCountryData('southafrica');

const renderCountry = function (data, className = '') {
  const [currencyObj] = Object.values(data.currencies);
  const currency = Object.values(currencyObj).join(', ');
  const languages = Object.values(data.languages).join(', ');
  // console.log(languages);
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

const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (countryCode) {
  getJSON(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
    '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
  )
    .then(data => {
      // console.log(data[0]);
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      if (!neighbor)
        throw new Error('Yeah... You are looking at an Island 👀.');
      // prettier-ignore
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`, 
        '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
      )
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`OOPS! ${err.message}. Please try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
getCountryData('ind');
