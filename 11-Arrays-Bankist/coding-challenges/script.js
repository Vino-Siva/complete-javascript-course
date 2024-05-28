"use strict";
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
