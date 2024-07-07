// Exporting Module
console.log('Exporting shoppingCart.js module to script.js');

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to the cart!`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tQuant };

// // Module Pattern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;
  const stocksToReceive = [];

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart!`);
  };
  const orderStock = function (product, quantity) {
    stocksToReceive.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier!`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
    shippingCost,
  };
})();

ShoppingCart2.addToCart('apple', 6);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
