'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageEl = document.querySelector('.images');

/////////////////////////////////////////
/*
const renderCountry = function (data, className = '') {
  const [currencyObj] = Object.values(data.currencies);
  const currency = Object.values(currencyObj).join(', ');
  const [languages] = Object.values(data.languages).join(', ');
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

const getPosition = () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );

// const whereAmI = function (lat, long) {
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })
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
btn.addEventListener('click', whereAmI);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
*/

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    // image.setAttribute('src', imgPath);
    image.src = imgPath;
    image.addEventListener('load', () => {
      imageEl.append(image);
      resolve(image);
    });
    image.addEventListener('error', () => reject(new Error('Image not found')));
  });
};

let currentImage;

createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log('Image 3 loaded');
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => console.error(err.message));

const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded.');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded.');
    await wait(2);
    img.style.display = 'none';

    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded.');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err.message);
  }
};

loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err.message);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
