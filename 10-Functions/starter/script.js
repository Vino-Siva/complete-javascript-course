"use strict";
const bookings = [];
const createBooking = (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) => {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking("LH213");
createBooking("LH213", 2); // Here price is calculated based on the default value provided for 2 passengers
createBooking("LH213", undefined, 999); // Here numPassengers parameter is skipped using the 'undefined' keyword

//// How passing arguments works: Value vs Reference
const flight = "LH234";
const vinoth = {
  name: "Vinoth Subramanian",
  passport: 23434543,
};
const checkIn = (flightNum, passenger) => {
  flightNum = "LH999"; // $ This won't affect the output since we reassigned flight parameter to flightNum before this line is executed.
  passenger.name = "Mr." + passenger.name; // $ This is same as doing \const passenger = vinoth\. So we are assigning vinoth.name here
  passenger.passport === 23434543
    ? console.log("Checked In")
    : console.log("Wrong Passport! Unable to Check In");
};
checkIn(flight, vinoth);
console.log(flight);
console.log(vinoth);

const newPassport = (person) => {
  person.passport = Math.trunc(Math.random() * 100000000);
};
newPassport(vinoth);
checkIn(flight, vinoth);

//// Functions Accepting Callback Functions
const oneWord = (str) => str.replace(/ /g, "").toLowerCase();
const upperFirstWord = (str) => {
  const [first, ...otherWords] = str.split(" ");
  return [first.toUpperCase(), ...otherWords].join(" ");
};
const transformer = (str, fn) => {
  console.log(`Original String: ${str}`);
  console.log(`Transformed String: ${fn(str)}`);
  console.log(`Transformed By: ${fn.name}`);
};
transformer("JavaScript is the best", upperFirstWord);
transformer("JavaScript is the best", oneWord);

//// Functions returning other functions
const greet = (greeting) => {
  return (name) => {
    console.log(`${greeting} ${name}`);
  };
};

//$ Also can be written like
const greetArrow = (greeting) => (name) => console.log(`${greeting}, ${name}`);

const greetHey = greet("Hey");
const greetHello = greet("Hello");
greetHey("Vinoth");
greetHello("Vinoth");
greetArrow("Hey")("Vinoth Siva");
greetArrow("Hello")("Vinoth Siva");

//// The Call and Apply Methods
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(247, "Vinoth Siva");
lufthansa.book(247, "Buvi");
lufthansa.book(247, "Rudra");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};
const swiss = {
  airline: "Swiss Airlines",
  iataCode: "LX",
  bookings: [],
};

// $ Call Method
const book = lufthansa.book;
book.call(eurowings, 2348, "Vinoth Siva"); // $ Call method manually manipulates the 'this' keyword
book.call(eurowings, 2348, "Buvi");
book.call(eurowings, 2348, "Rudra");

// $ Apply Method
const flightData = [523, "George Cooper"];
book.apply(eurowings, flightData); // * Less frequently used, here the Argument is passed as an array. With latest ES6 syntax even if data is provided as an array we can spread it in the call method.
console.log(eurowings);

// $ Same in Call Method
book.call(eurowings, ...flightData);
console.log(eurowings);

//// Bind Method
const bookEW = book.bind(eurowings); // $ Bind method does not call the function like call and apply, but instead returns a new function.
bookEW(23, "Steven Williams"); // $ Here the this keyword is fixed on Eurowings using bind method.
// $ We can create many functions using bind method for different airlines and also for individual flights as well.

const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

const bookEW23 = book.bind(eurowings, 23);
bookEW23("Vinoth Siva");

//// Bind method usage with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// $ Partial Application
const addTax = (rate, value) => value + (value * rate) / 100;
console.log(addTax(10, 200));

const addVAT = addTax.bind(null, 23);
// * This is same as declaring const addVAT = (value) => value + value * 0.23
console.log(addVAT(100));

const addTax2 = (rate) => (value) => value + (value * rate) / 100;

//// Immediately invoked function expression (IIFE)
(function () {
  console.log("This function will never run again");
})();
// $ Same can be done with the arrow function
(() => console.log("This function will never run again"))();

// $ This was created for privacy by the programmers. But in modern ES6 syntax privacy can be achieved by declaring const and let variable inside a block since they are block scoped
{
  const isPrivate = true;
  let isAlsoPrivate = true;
  var wishIsPrivate = false; //* Never use var for private variables since they can be accessed outside the block
}

//// Closures
/**
 * @description A closure is the closed-over variable environment(VE) of the execution context in which a function was created, even after that execution context is gone.
 *
 * A closure gives a function access to all the variables of its parent function, even after that parent function has returned. the function keeps a reference to its outer scope, which preserves the scope chain throughout time.
 *
 * A closure makes sure that a function doesn't loose connection to variables that existed at the function's birth place.
 *
 * A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.
 *
 * @summary We do not have to manually create closures, this is a JavaScript feature that happens automatically. We can't even access closed-over variables explicitly. A closure is not a tangible JavaScript object.
 */
const secureBooking = () => {
  let passengerCount = 0;
  return () => {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);
