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

// const getJSON = function (url, errMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
//     return response.json();
//   });
// };
const getJSON = async function (url, errMsg = 'Something went wrong') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errMsg} (${response.status})`);
  return await response.json();
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

///////////// Building promises////////////////

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN !!!!');
    } else {
      reject(new Error('💩 You LOST your Money!'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//// Promisify setTimeout() Method ////
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000)
//   })
// }

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//* navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err)) // $ Can be further simplified
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

const getPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

getPosition()
  .then(pos => console.log(pos))
  .catch(err => console.error(err.message));

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;
    const geoRes = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);

    if (!geoRes.ok) throw new Error('Problem getting location data');
    const geoData = await geoRes.json();
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${geoData.prov}`
    );
    if (!res.ok) throw new Error('Problem getting country data');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err.message);
    renderError(`🧐 Something Went Wrong! ${err.message}`);
  }
};

const countryData = async function (countryCode) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha/${countryCode}`
    );
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`🧐 Something Went Wrong! ${err.message}`);
    throw err;
  }
};

countryData('IND');
whereAmI()
  .then(city => console.log(city))
  .catch(err => console.error(err))
  .finally(() => console.log('Finished getting Location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.error(err.message);
  }
  console.log('Finished getting Location');
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    // const data1 = await getJSON(
    //   `https://restcountries.com/v3.1/alpha/${c1}`,
    //   '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    // );
    // const data2 = await getJSON(
    //   `https://restcountries.com/v3.1/alpha/${c2}`,
    //   '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    // );
    // const data3 = await getJSON(
    //   `https://restcountries.com/v3.1/alpha/${c3}`,
    //   '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    // );
    // console.log(data1.capital, data2.capital, data3.capital);

    // $ Running these in parallel to save load time using Promise.all() promise combinator
    const data = await Promise.all([
      getJSON(
        `https://restcountries.com/v3.1/alpha/${c1}`,
        '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
      ),
      getJSON(
        `https://restcountries.com/v3.1/alpha/${c2}`,
        '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
      ),
      getJSON(
        `https://restcountries.com/v3.1/alpha/${c3}`,
        '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
      ),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err.message);
  }
};

get3Countries('IN', 'PO', 'TZ');

// // Other promise combinator

// $ 1. Promise.race()
(async function () {
  const res = await Promise.race([
    getJSON(
      `https://restcountries.com/v3.1/alpha/IN`,
      '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    ),
    getJSON(
      `https://restcountries.com/v3.1/alpha/PO`,
      '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    ),
    getJSON(
      `https://restcountries.com/v3.1/alpha/TZ`,
      '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
    ),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error('Session Timed Out')), sec * 1000);
  });
};

// * Promise.race is mainly used to set a timeout request.
Promise.race([
  getJSON(
    `https://restcountries.com/v3.1/alpha/IN`,
    '😱 Cannot find the "Country" you are looking for. FYI, this is Planet EARTH! 👽'
  ),
  timeout(5),
]);

// $ 2. Promise.allSettled()
// * Unlike Promise.all(), Promise.allSettled() will return all settled promises both resolved and rejected. (Promise.all() throws all promises if any of the promise is rejected)

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// $ 3. Promise.any()
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
