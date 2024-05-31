"use strict";

//// Coding Challenge #1
const checkDogs = (dogsJulia, dogsKate) => {
  const realDogsJulia = dogsJulia.slice();
  realDogsJulia.splice(0, 1);
  realDogsJulia.splice(-2);
  const dogsData = realDogsJulia.concat(dogsKate);
  dogsData.forEach((dogAge, i) => {
    dogAge >= 3
      ? console.log(
          `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
        )
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};
const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];
checkDogs(juliaData1, kateData1);
console.log("///////////////////////");
checkDogs(juliaData2, kateData2);

//// Coding Challenge #2
const calcAvgHumanAge = (ages) => {
  const humanAge = ages.map((dogAge) =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  const adultDogs = humanAge.filter((age) => age >= 18);
  const avgHumanAge =
    adultDogs.reduce((accAge, currAge) => accAge + currAge) / adultDogs.length;
  return avgHumanAge;
};
const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAvgHumanAge(data1));
console.log(calcAvgHumanAge(data2));

//// coding Challenge #3
const calcAvgHumanAgeChaining = (ages) =>
  ages
    .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter((age) => age >= 18)
    .reduce((accAge, currAge, _, arr) => accAge + currAge) / arr.length;
console.log(calcAvgHumanAge(data1));
console.log(calcAvgHumanAge(data2));
