'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Vinoth Subramanian',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-06-03T17:01:17.194Z',
    '2024-06-06T23:36:17.929Z',
    '2024-06-07T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-IN',
};
const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2];

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

// $ Formatting transaction date into its own function
const formatTransactionDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(Date.now(), date);
  if (daysPassed <= 1) {
    return daysPassed === 0 ? 'Today' : 'Yesterday';
  } else {
    return daysPassed <= 7
      ? `${daysPassed} days ago`
      : new Intl.DateTimeFormat(locale).format(date);
  }
};

// $ Formatting Transactions using International API (Intl)
const formatCurrency = (value, locale, currency) => {
  const transOptions = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, transOptions).format(value);
};

// $ Displaying transactions
const displayTransactions = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  const transactions = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  transactions.forEach(function (transValue, i) {
    const transType = transValue > 0 ? 'deposit' : 'withdrawal';

    //$ Displaying Date for movements
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatTransactionDate(date, acc.locale);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${transType}">${
      i + 1
    } ${transType}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatCurrency(
        transValue,
        acc.locale,
        acc.currency
      )}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// $ Displaying Balance using reduce method
const displayCalcBalance = acc => {
  acc.balance = acc.movements.reduce(
    (accValue, currValue) => accValue + currValue,
    0
  );
  labelBalance.textContent = `${formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

// $ Displaying in/out and interest using filter & reduce methods
const displayCalcSummary = acc => {
  const inwardTrans = acc.movements
    .filter(trans => trans > 0)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumIn.textContent = `${formatCurrency(
    inwardTrans,
    acc.locale,
    acc.currency
  )}`;
  const outwardTrans = acc.movements
    .filter(trans => trans < 0)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumOut.textContent = `${formatCurrency(
    Math.abs(outwardTrans),
    acc.locale,
    acc.currency
  )}`;
  const interest = acc.movements
    .filter(trans => trans > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((accValue, transValue) => accValue + transValue, 0);
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

const updateUI = acc => {
  displayTransactions(acc);
  displayCalcBalance(acc);
  displayCalcSummary(acc);
};

// $ Logout Timer
const startLogoutTimer = () => {
  let time = 600;
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// $ implementing login feature using event handlers
let currentUser, timer;
const loginEvent = e => {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (currentUser?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentUser.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100; // * Displaying dashboard
    // $ Displaying Dates
    const now = new Date();
    const dateOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentUser.locale,
      dateOptions
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = ''; // * Clearing input fields after login. Need an update.
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    updateUI(currentUser);
  }
};
btnLogin.addEventListener('click', loginEvent);

// $ Implementing transfer feature
const transferEvent = e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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
    // $ Pushing dates for transfers
    currentUser.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentUser);
    clearInterval(timer);
    timer = startLogoutTimer();
  }
};
btnTransfer.addEventListener('click', transferEvent);

// $ Availing loan
// ! Needs future update
const getLoan = e => {
  e.preventDefault();
  const requestAmount = Math.floor(inputLoanAmount.value);
  if (
    requestAmount > 0 &&
    currentUser.movements.some(trans => trans >= requestAmount * 0.1)
  ) {
    setTimeout(function () {
      currentUser.movements.push(requestAmount);
      // $ Pushing dates for loans
      currentUser.movementsDates.push(new Date().toISOString());
      updateUI(currentUser);
    }, 2500);
  }
  inputLoanAmount.value = '';
  clearInterval(timer);
  timer = startLogoutTimer();
};
btnLoan.addEventListener('click', getLoan);

// $ Ability to close account
const closeAccount = e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentUser.username &&
    +inputClosePin.value === currentUser.pin
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

// $ Sorting Account transactions
let sorted = false;
const sortTransactions = e => {
  e.preventDefault();
  displayTransactions(currentUser, !sorted);
  sorted = !sorted;
};
btnSort.addEventListener('click', sortTransactions);
