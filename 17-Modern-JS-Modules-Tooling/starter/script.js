// Importing Module
// import { addToCart, totalPrice as tPrice, tQuant } from './shoppingCart.js';

console.log('Modules Imported into script.js!');
// addToCart('bread', 3);
// console.log(tPrice, tQuant);

// // Can also be used as below, which kind of looks like a class
import * as ShoppingCart from './shoppingCart.js'; // $ meaning import every exports from shoppingCart.js into ShoppingCart object.

ShoppingCart.addToCart('bread', 3);
console.log(ShoppingCart.tQuant, ShoppingCart.totalPrice);

//// Top level await introduced in 2022 only works in modules.
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

//! Important point to take is top-level await blocks the entire module, even the importing module. i.e. only after it returns the response of the promise.
// $ Sometimes it's useful to use top-level await.

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
const lastPost = getLastPost();
console.log(lastPost); // * Here the async function actually returns a promise. Not the result we expected.

// * In this case we can use top level await.
const lastPostCorrected = await getLastPost();
console.log(lastPostCorrected);

//* Instead of using this,
lastPost.then(last => console.log(last)); // * Which is not that clean.

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);
