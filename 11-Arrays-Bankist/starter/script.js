'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//// Array Methods
// $ Slice - Does not mutate the original array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log('arr = ', arr);
console.log('Slice Method (from Index 2 of arr): ', arr.slice(2));
console.log('Slice Method (from Index 2 to index 4 of arr): ', arr.slice(2, 4));
console.log('Slice Method (from Index -1 of arr): ', arr.slice(-1));
// * Creating a shallow copy
console.log('Creating a shallow copy using slice: ', arr.slice());
// * Another method to create a shallow copy
console.log('Shallow copy using spread operator: ', [...arr]);

// $ Splice - Mutates the original array
console.log('Splice Method (at Index 2 of arr): ', arr.splice(2));
arr = ['a', 'b', 'c', 'd', 'e'];
console.log('Splice Method (at Index -1 of arr): ', arr.splice(-1));
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(
  'Splice Method (at Index -3 and 2 counts of arr): ',
  arr.splice(-3, 2)
); // Second parameter is how many elements we want to delete

// $ Reverse - Mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log('Reverse Method: ', arr2.reverse());
console.log('Mutated array using reverse method: ', arr2);

// $ Concat Method - Does not mutate the original array
const letters = arr.concat(arr2);
console.log('Concat Method: ', letters);

//$ Join Method
console.log('Join Method: ', letters.join(' - '));

// $ At Method
const arr3 = [8, 16, 24, 36];
console.log(arr3[0]);
console.log(arr3.at(0));
console.log(arr3.at(-1));
console.log('At method can be used in strings as well: ', 'Vinoth'.at(0));

for (const [index, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${index + 1}: You deposited ${movement} $`);
  } else {
    console.log(`${index + 1}: You Withdrew ${Math.abs(movement)} $`);
  }
}

console.log('/////////   Using forEach Method   //////////');
movements.forEach((movement, index) => {
  if (movement > 0) {
    console.log(`${index + 1}: You deposited ${movement} $`);
  } else {
    console.log(`${index + 1}: You Withdrew ${Math.abs(movement)} $`);
  }
});

//// forEach Method on maps and sets
// $ On Map
currencies.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// $ On Sets

const currenciesUnique = new Set(['INR', 'USD', 'INR', 'EUR', 'GBP', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, value2) => {
  console.log(`${value}: ${value2}`);
});
// * forEach in set uses the same parameter twice as value and value 2 we can simply ignore it.
currenciesUnique.forEach(value => console.log(`${value}`));

// * If you want the third parameter set which is the object set, simply use _ as a placeholder for second parameter
currenciesUnique.forEach((value, _, set) => {
  console.log(`${value}: ${set}`);
});
const eurToUsd = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUsd);
const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsUSD, movementsDescription);

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
console.log(deposits);
console.log(withdrawals);
const balance = movements.reduce(
  (preValue, curValue) => preValue + curValue,
  0
);
console.log(balance);

// $ Creating arrays
const arr1 = [1, 2, 3, 4, 5, 6, 7]; //* Manual method
const constructArray = new Array(1, 2, 3, 4, 5, 6, 7); //* Using Array constructor
const constructEmptyArr = new Array(7); //* Constructs an empty array with a length of 7
console.log(constructEmptyArr);
constructEmptyArr.fill(1); //* Fills or replaces all elements of this array with a value of 1
console.log(constructEmptyArr);
constructEmptyArr.fill(2, 1, 4); //* fills or replaces elements from index 1 to 4 (excluded) with value of 2
console.log(arr, constructArray, constructEmptyArr);
const x = Array.from({ length: 7 }, () => 1); // * Creating an array of length 7 with value of 1. This method is dynamic as we can specify the array using a map function
const y = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(x, y);

labelBalance.addEventListener('click', () => {
  const transactionsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    elem => Number(elem.textContent.replace('€', '').replace(' ', ''))
  );
  console.log(transactionsUI);
  const transactionsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(transactionsUI2);
});
