"use strict";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// Array destructuring

const arr = [2, 3, 4];
// Hard method
const a = arr[0];
const b = arr[1];
const c = arr[2];

// Easy method
const [x, y, z] = arr;
console.log(x, y, z);
let [main, , secondary] = restaurant.categories; // * We can also skip an element in an array just by inserting space inside assignment variable.
console.log("Before Switching: ", main, secondary);

// Switching variables
// Basic Switching
const temp = main;
main = secondary;
secondary = temp;
console.log("After Switching: ", main, secondary);

// Another Method
[main, secondary] = [secondary, main];
console.log("Switching back to original state: ", main, secondary);

const [starter, mainCourse] = restaurant.order(1, 2);
console.log(
  `Hi you chose ${starter}, as your starter and ${mainCourse} for your main course.`
);

// Using destructuring in a nested array
const nestedArr = [2, 3, [5, 6], 4];
const [i, , j] = nestedArr;
console.log(i, j);
const [d, , [e, f]] = nestedArr; // Nested destructuring
console.log(d, e, f);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9]; // Assigning default Values of 1
console.log(p, q, r); // Here 'r' returns a default value since there is not enough elements for destructuring.

//// String Methods:
const airline = "TAP Air India";
const plane = "A320";

//$ -- A string is just an array of characters
console.log(plane[0], plane[1]);

const charPlane = [];
for (const char of plane) {
  charPlane.push(char);
}
console.log(charPlane);
console.log(airline.length);
console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.includes("India"));
console.log(airline.includes("india")); // $ ---- String methods are case sensitive
console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(airline.indexOf(" ") + 1, 7));
console.log(airline.slice(airline.indexOf(" ") + 1, airline.lastIndexOf(" "))); // $ -- We can also call another string method inside a string method
console.log(airline.slice(-5, -2));
console.log(airline.valueOf());

const checkIsMiddleSeat = (seat) => {
  const s = seat.slice(-1);
  s === "B" || s === "E"
    ? console.log("You got the middle seat 🤨")
    : console.log("You got lucky 🤓");
};
checkIsMiddleSeat("11B");
checkIsMiddleSeat("23C");
checkIsMiddleSeat("16E");

console.log(new String("vinoth"));
console.log(typeof new String("vinoth"));
console.log(typeof new String("vinoth").slice(1));
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
// const passengerName = "VINOTH";
// const passengerNameLower = passengerName.toLowerCase();
// const firstLetter = passengerNameLower.slice(0, 1);
// console.log(firstLetter);

const passengerNameNormal = (name) => {
  const passengerNameLower = name.toLowerCase();
  const firstLetter = passengerNameLower[0].toUpperCase();
  return firstLetter + passengerNameLower.slice(1);
  // passengerNameLower.replace(   // // We can also do this for capitalization
  //   passengerNameLower[0],
  //   passengerNameLower[0].toUpperCase()
  // );
};
passengerNameNormal("VINOTH");
console.log("Splitting a string into an array".split(" "));
console.log("Splitting+a+string+into+an+array".split("+"));
const fullName = "Vinoth Subramanian";
const [firstName, lastName] = fullName.split(" ");
console.log(`Mr. ${firstName} ${lastName}`);
const fullName1 = [
  "Mr.",
  passengerNameNormal(firstName),
  passengerNameNormal(lastName),
].join(" ");
console.log(fullName1);

const maskCreditCard = (number) => {
  const str = number + "";
  return str.slice(-4).padStart(str.length, "*");
};
console.log(maskCreditCard(4567345645672346));

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
