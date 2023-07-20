/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Aabid Mahat',
  movements: [200, 455.23, -306.5, 25_000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2023-07-08T14:11:59.604Z',
    '2023-07-15T17:01:17.194Z',
    '2023-07-18T15:36:17.929Z',
    '2023-07-19T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Anis Suraj Mahat',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2023-07-13T14:43:26.374Z',
    '2023-07-16T18:49:59.371Z',
    '2023-07-19T12:01:20.894Z',
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
const containerMovementsRow = document.querySelector('.movements_row');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// const userLogin = document.querySelector('.login__btn');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//creating todays date;
const calDates = date => {
  const daysCal = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24);
  const daysRemain = Math.round(Math.abs(daysCal(new Date(), date)));

  //Logical Operations

  if (daysRemain === 0) return 'Today';
  if (daysRemain === 1) return 'Yesterday';
  if (daysRemain <= 7) return `${daysRemain} days ago`;
  else {
    const dateData = Intl.DateTimeFormat(currentAccount.locale).format(
      new Date()
    );
    return dateData;
  }
};
//Update time;
const updateTime = () => {
  tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(updateTime);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 10 * 60;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//Update data(movements)
const updateCurrency = (acc, movements) => {
  const option = {
    style: 'currency',
    currency: acc.currency,
  };

  return new Intl.NumberFormat(acc.locale, option).format(movements);
};

const displayData = (moments, sort = false) => {
  containerMovements.innerHTML = '';

  //Sorting the array;
  const sorts = sort
    ? moments.slice().sort((curr, next) => curr - next)
    : moments;

  sorts.forEach((mov, i) => {
    // console.log(currentTime);
    const date = new Date(currentAccount.movementsDates[i]);

    let displayDate = calDates(date);
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 3
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${updateCurrency(
            currentAccount,
            mov
          )}</div>
        </div>
    `;

    //insertAdjacentHTML is used to add element or data to the html it has four parts
    //1)beforebegin 2)afterbegin 3)beforeend 4)afterend

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//Create a new Username;
const createUserName = accs => {
  //forEach loop mutate the original array;

  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(data => data[0])
      .join('');
  });
};
createUserName(accounts);

const updateUI = acc => {
  displayData(acc.movements);

  //Display balance
  calCurrentBal(acc);

  //Display summary
  withdrawAndDeposit(acc.movements, acc.interestRate);
};

//create a current balance;
const calCurrentBal = accs => {
  accs.balance = accs.movements.reduce((acc, cur) => (acc += cur), 0);
  labelBalance.textContent = `${updateCurrency(accs, accs.balance)}`;
};
// calCurrentBal(account1.movements);
// console.log(accounts);
const withdrawAndDeposit = (accs, int) => {
  const depositMoney = accs
    .filter(bal => bal > 0)
    .reduce((acc, bal) => acc + bal);
  const withdrawal = accs
    .filter(bal => bal < 0)
    .reduce((acc, bal, i, arr) => {
      if (arr.length === 0) {
        return 0;
      } else return acc + bal;
    }, 0);

  const interestRate = accs
    .filter(acc => acc > 0)
    .map(acc => (acc * int) / 100)
    .filter(int => int >= 1)
    .reduce((acc, accs) => acc + accs);

  labelSumIn.textContent = `${updateCurrency(currentAccount, depositMoney)}`;
  labelSumOut.textContent = `${updateCurrency(
    currentAccount,
    Math.abs(withdrawal)
  )}`;
  labelSumInterest.textContent = `${updateCurrency(
    currentAccount,
    interestRate
  )}`;

  //Reset timer;
  clearInterval(timer);
  timer = updateTime();
};

// withdrawAndDeposit(account1.movements, account1.interestRate);

//Login Credentials
let currentAccount, timer;

const loginAdmin = cred => {
  btnLogin.addEventListener('click', e => {
    //Prevent form from submitting
    e.preventDefault();

    const username = inputLoginUsername.value.trim();
    const pin = inputLoginPin.value * 1;

    currentAccount = cred.find(
      data => data.username === username && data.pin === pin
    );
    if (!currentAccount) alert('Account is not present');
    console.log(currentAccount);

    //Clear the input field
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    //to loose focus we use blur method;

    inputLoginPin.blur();

    if (timer) clearInterval(timer);
    timer = updateTime();
    //Display UI and message;
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    //Update UI;
    updateUI(currentAccount);
  });
};
loginAdmin(accounts);

const transferAmount = accs => {
  btnTransfer.addEventListener('click', e => {
    e.preventDefault();
    let inputUsername = inputTransferTo.value;
    const username = inputUsername.trim();

    let transferMoney = Math.round(inputTransferAmount.value * 1);

    const account = accs.find(acc => acc.username === username);
    console.log(account);
    if (
      transferMoney > 0 &&
      transferMoney <= currentAccount.balance &&
      account.username != currentAccount.username &&
      account
    ) {
      console.log('Transfer Valid');
      account.movements.push(transferMoney);
      account.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(-transferMoney);
      currentAccount.movementsDates.push(new Date().toISOString());
    } else {
      alert('Invalid Amount');
    }

    inputTransferAmount.value = inputTransferTo.value = ' ';
    inputTransferTo.blur();

    //Update UI
    updateUI(currentAccount);
  });
};

transferAmount(accounts);

//request loan
//condition if there's atLeast one deposit which is equal to 10% of requested loan

const requestLoan = () => {
  btnLoan.addEventListener('click', e => {
    e.preventDefault();
    const loan = Math.floor(inputLoanAmount.value * 1);
    const condition = currentAccount.movements.some(data => data * 0.1 >= loan);
    console.log(condition);
    if (condition && loan > 0) {
      setTimeout(() => {
        currentAccount.movements.push(loan);
        currentAccount.movementsDates.push(new Date().toISOString());

        updateUI(currentAccount);
      }, 2500);
    } else {
      alert('Invalid Request');
    }
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  });
};
requestLoan();

const deleteAccount = accs => {
  btnClose.addEventListener('click', e => {
    e.preventDefault();
    const username = inputCloseUsername.value.trim();
    const pin = inputClosePin.value * 1;

    const correctAcct = accs.find(
      acc => acc.username === username && acc.pin === pin
    );
    if (correctAcct) {
      console.log('Valid Acct Info');

      //findMyIndex;
      const index = accs.findIndex(acc => acc.username === username);
      console.log(index);
      accs.splice(index, 1);
      console.log(accs);
      containerApp.style.opacity = 0;
    } else {
      alert('Invalid Acct');
    }
    //check credentials;
  });
};
deleteAccount(accounts);

//sortying the Array;
let sorted = false;
const sort = () => {
  btnSort.addEventListener('click', e => {
    e.preventDefault();
    displayData(currentAccount.movements, !sorted);
    sorted = !sorted;
  });
};
sort();
/////////////////////////////////////////////////
labelWelcome.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log(movementsUI.map(el => el.textContent.replace('€', '') * 1));
});

//Coloring the even part;

btnLogin.addEventListener('click', e => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const local = navigator.language;
  console.log(local);
  e.preventDefault();
  const evenPart = [...document.querySelectorAll('.movements__row')];
  evenPart.forEach((row, index) => {
    if (index % 2 != 0) row.style.backgroundColor = 'lightgrey';
  });
  setInterval(() => {
    labelDate.textContent = Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());
  }, 1000);
});

//Creating Dates and modelling the dates

// const year = currentTime.getFullYear();
// const month = `${currentTime.getMonth() + 1}`.padStart(2, '0');
// const day = `${currentTime.getDate()}`.padStart(2, '0');
// const hours = `${currentTime.getHours()}`.padStart(2, '0');
// const minutes = `${currentTime.getMinutes()}`.padStart(2, '0');
// console.log(currentTime);
// labelDate.textContent = `${day}/${month}/${year} , ${hours}:${minutes} Hours`;
