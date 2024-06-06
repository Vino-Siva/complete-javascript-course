'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Vinoth Subramanian',
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

// $ Creating UserNames
const generateUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name.slice(0, 3))
      .join('');
  });
};
generateUsername(accounts);

accounts.forEach(acc => {
  console.log(
    `Username: ${acc.username}\npassword: ${acc.pin}\n_______________`
  );
});

// $ Displaying transactions
const displayTransactions = (movements, sort = false) => {
  containerMovements.innerHTML = '';
  const transactions = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  transactions.forEach(function (transValue, i) {
    const transType = transValue > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${transType}">${
      i + 1
    } ${transType}</div>
      <div class="movements__value">${transValue} €</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// $ Sorting Account transactions
let sorted = false;
const sortTransactions = e => {
  e.preventDefault();
  displayTransactions(currentUser.movements, !sorted);
  sorted = !sorted;
};
btnSort.addEventListener('click', sortTransactions);

// $ Displaying Balance using reduce method
const displayCalcBalance = acc => {
  acc.balance = acc.movements.reduce(
    (accValue, currValue) => accValue + currValue,
    0
  );
  labelBalance.textContent = `${acc.balance} €`;
};

// $ Displaying in/out and interest using filter & reduce methods
const displayCalcSummary = acc => {
  const inwardTrans = acc.movements
    .filter(trans => trans > 0)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumIn.textContent = `${inwardTrans} €`;
  const outwardTrans = acc.movements
    .filter(trans => trans < 0)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumOut.textContent = `${Math.abs(outwardTrans)} €`;
  const interest = acc.movements
    .filter(trans => trans > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumInterest.textContent = `${interest} €`;
};

const updateUI = acc => {
  displayTransactions(acc.movements);
  displayCalcBalance(acc);
  displayCalcSummary(acc);
};

// $ implementing login feature using event handlers
let currentUser;
const loginEvent = e => {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // * Displaying dashboard
    inputLoginUsername.value = inputLoginPin.value = ''; // * Clearing input fields after login. Need an update.
    inputLoginPin.blur();
    updateUI(currentUser);
  }
};
btnLogin.addEventListener('click', loginEvent);

// $ Implementing transfer feature
const transferEvent = e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentUser.balance >= amount &&
    receiverAcc?.movements !== currentUser.username
  ) {
    currentUser.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentUser);
  }
};
btnTransfer.addEventListener('click', transferEvent);

// $ Ability to close account
const closeAccount = e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentUser.username &&
    Number(inputClosePin.value) === currentUser.pin
  ) {
    accounts.splice(
      accounts.findIndex(acc => acc.username === currentUser.username),
      1
    );
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
};
btnClose.addEventListener('click', closeAccount);

// $ Availing loan
// ! Needs future update
const getLoan = e => {
  e.preventDefault();
  const requestAmount = Number(inputLoanAmount.value);
  if (
    requestAmount > 0 &&
    currentUser.movements.some(trans => trans >= requestAmount * 0.1)
  ) {
    currentUser.movements.push(requestAmount);
    updateUI();
  }
  inputLoanAmount.value = '';
};
btnLoan.addEventListener('click', getLoan);
