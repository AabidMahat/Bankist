/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Aabid Mahat',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Anis Mahat',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Suraj Mahat',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Jyotshna Mahat',
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
const today = new Date();

const displayData = moments => {
  containerMovements.innerHTML = '';

  moments.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 3
    } ${type}</div>
            <div class="movements__date">${today.getHours()}:${today.getMinutes()} hours</div>
            <div class="movements__value">${Math.abs(mov)}€</div>
          </div>
      `;

    //insertAdjacentHTML is used to add element or data to the html it has four parts
    //1)beforebegin 2)afterbegin 3)beforeend 4)afterend

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayData(account1.movements);

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

//create a current balance;
const calCurrentBal = accs => {
  accs.balance = accs.movements.reduce((acc, cur) => (acc += cur), 0);
  labelBalance.textContent = `${accs.balance}€`;
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

  const intresetRate = accs
    .filter(acc => acc > 0)
    .map(acc => (acc * int) / 100)
    .filter(int => int >= 1)
    .reduce((acc, accs) => acc + accs);

  labelSumIn.textContent = `${depositMoney}€`;
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;
  labelSumInterest.textContent = `${intresetRate}€`;
};

// withdrawAndDeposit(account1.movements, account1.interestRate);

//Login Credentials
let currentAccount;
const loginAdmin = cred => {
  // btnLogin.addEventListener('click', e => {
  //   //Prevent form from submitting
  //   e.preventDefault();
  //   const username = inputLoginUsername.value;
  //   const pin = inputLoginPin.value * 1;
  //   currentAccount = cred.find(
  //     data => data.username === username && data.pin === pin
  //   );
  //   if (!currentAccount) console.log('Acc does exsits');
  //   console.log(currentAccount);
  //   //Clear the input field
  //   inputLoginUsername.value = '';
  //   inputLoginPin.value = '';
  //   //to loose focus we use blur method;
  //   inputLoginPin.blur();
  //   //Display UI and message;
  //   labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
  //   containerApp.style.opacity = 1;
  //   //Display Movements;
  //   displayData(currentAccount.movements);
  //   //Display balance
  //   calCurrentBal(currentAccount);
  //   //Display summary
  //   withdrawAndDeposit(currentAccount.movements, currentAccount.interestRate);
  // });
};
loginAdmin(accounts);

const transferAmount = accs => {
  // btnTransfer.addEventListener('click', e => {
  //   e.preventDefault();
  //   let inputUsername = inputTransferTo.value;
  //   let transferMoney = inputTransferAmount.value * 1;
  //   const account = accs.find(acc => acc.username === inputUsername);
  //   if (transferMoney > 0 && transferMoney <= account.balance) {
  //     account.movements.push(transferMoney);
  //     displayData(currentAccount.push(-transferMoney));
  //   } else {
  //     alert('Invalid Amount');
  //   }
  //   //Display Movements;
  //   inputTransferAmount.value = inputTransferTo.value = ' ';
  //   inputTransferTo.blur();
  // });
};
transferAmount(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'a', 'b', 'i', 'd'];
// console.log(arr.slice(2));

// //spread operator;
// console.log([...arr]);
// console.log(arr.slice());

// //splice method
// //splice method mutate the original array or modify the original array;

// console.log(arr.splice(-1));
// console.log(arr);

// //second parameter in splice method is number of element to delete from the array;

// console.log(arr.splice(1, 2));
// console.log(arr);

// //Reverse method (mutate array)
// arr = ['a', 'a', 'b', 'i', 'd'];
// let arr2 = ['k', 'j', 'i', 'h', 'g'];

// arr2.reverse();
// console.log(arr2);

// //Concat method;
// const letter = arr.concat(arr2);
// console.log(letter);
// console.log([...arr, ...arr2]);

// //JOIN method

// const joinArray = [...arr, ...arr2].join(' - ');

// console.log(joinArray);

// //at method
// const dummyArray = [12, 23, 345, 67];
// console.log();

// //to get last element;
// console.log(dummyArray.slice(-1)[0]);
// console.log(dummyArray.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, data] of movements.entries()) {
//   // console.log(data);
//   if (data < 0) console.log(` ${i + 1} WithDraw = ${Math.abs(data)}`);
//   else console.log(`${i + 1} Deposited = ${Math.abs(data)}`);
// }
// console.log('******************** FOREACH ********************');

// //forEach loop

// //first parameter = current element
// //second parameter = index
// //third parameter = array

// movements.forEach((data, index, arr) => {
//   if (data < 0) console.log(`Withdraw no : ${index + 1} = ${Math.abs(data)}`);
//   else console.log(`Deposited no : ${index + 1} = ${Math.abs(data)}`);
// });
// // const Anis = 'Welcome';
// // console.log(Anis.padStart(25, '-'));

// //Maps

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((value, keys, arr) => {
//   console.log(`${keys} : ${value} `);
// });

// //sets
// //Sets doesn't have keys and index

// //we use '_' which indicates throwaway variable
// const currenciesUnique = new Set(['USD', 'EUR', 'GBPS']);
// currenciesUnique.forEach(value => {
//   console.log(`${value} `);
// });

//Maps Method
const convertEuroToUsd = 1.1;
const movements = account2.movements.map(data => {
  return (data * convertEuroToUsd).toFixed(2);
});
// console.log(movements);

const mapMethod = account2.movements.map((data, index) => {
  if (data < 0) return `Withdraw no : ${index + 1} = ${Math.abs(data)}`;
  else return `Deposited no : ${index + 1} = ${Math.abs(data)}`;
});
// console.log(mapMethod);

const newMap = new Map();
newMap.set('Aabid', 'Aabid');
// console.log(newMap);

const another = new Map([['Anis', 'Anis']]);
another.set('Aabid', 'Aabid');
// console.log(another);

//Filter method
const acc3Movements = account3.movements;
console.log(acc3Movements);
const deposit = acc3Movements.filter(mov => {
  return mov > 0;
});
//withdrawals
const withdrawalAcct3 = acc3Movements.filter(mov => mov < 0);
console.log(deposit);
console.log(withdrawalAcct3);

//reduce method;
const acc4 = account4.movements;
const balance = acc4.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i} = ${acc}💶`);
  return acc + cur;
}, 0);
console.log(balance);
console.log(acc4);
const max = acc4.reduce((acc, cur) => {
  if (acc < cur) return (acc = cur);
  else return acc;
}, acc4.slice(0, 1));

console.log(max);

const euroToUsd = 1.1;
//PIPELINE;
const totalDepositUsd = acc4
  .filter(acc => acc > 0)
  .map(acc => acc * euroToUsd)
  .reduce((acc, cur) => acc + cur, 0);

console.log(totalDepositUsd);

//find method is use to find the element in the arr
// find method only withdraw the first find element from the array;

const movementArray = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstValue = movementArray.find(mov => mov < 0);
console.log(firstValue);

console.log(accounts);
const account = accounts.find(acc => acc.username === 'am');
// console.log(account);

const interestRate = acc => {
  const deposits = acc.filter(accs => accs > 0);
  console.log(deposits);

  const intreset = deposits.map(accs => (accs * 0.7) / 100);
  console.log(intreset);

  const nonZeroIntreset = intreset.filter(accs => accs >= 1);
  console.log(nonZeroIntreset);

  const totalInterest = nonZeroIntreset.reduce((accs, curr) => accs + curr);
  console.log(totalInterest);
};
// console.log(acc3Movements);
// interestRate(acc3Movements);
console.log(accounts);

//Some and every
console.log(acc3Movements);
const anyDeposits = acc3Movements.some(mov => mov > 100);
console.log(anyDeposits);

const everyDeposit = acc3Movements.every(mov => mov > -500);
console.log(everyDeposit);

//flat and flatMap
const arrayInArray = [[1, 2, 3], 4, 5, [6, 7, 8], 9]; // flat method remove the nested array and create a single array
console.log(arrayInArray.flat());

const deepNested = [[1, [2, 3], [4, [5]]]];
console.log(deepNested.flat());
console.log(deepNested.flat(3)); //argument in flat method is depth ie the level of nested array

const accountsMoments = accounts.map(acc => acc.movements);
console.log(accountsMoments);

const allMoments = accountsMoments.flat().reduce((acc, data) => acc + data, 0);
console.log(allMoments);

const allInOneBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, data) => acc + data, 0);

console.log(allInOneBalance);

//flatMap Method;
const flatMapMethod = accounts.flatMap(acc => acc.movements);
console.log(flatMapMethod);

//sorting of array
const owners = ['Aabid', 'Ashwini', 'Rohan', 'Anis'];
console.log(owners.sort());

//simple sort method won't work on number's array ;
//As sort method sort based on the string for eg (100,20) = 100,20;
//so for that reason we use call back function

//return curr>=next curr,next (keep order)
//return curr<next next,curr (switch order)
const overAllSorting = flatMapMethod.sort((curr, next) => {
  if (curr > next) {
    return 1;
  }
  if (curr < next) {
    return -1;
  }
});
console.log(overAllSorting);

//fill method;
const arr = [1, 2, 3, 4, 5, 6, 7];
arr.fill(23, 2, 5);
console.log(arr);

//when we specify the array constructor ; it will give us the empty arr of length 7
const newArr = new Array(7);
console.log(newArr);

// from method : from method is called on Array constructor nor the array;
const dynamic = Array.from({ length: 7 }, (_, index) => index + 1);
console.log(dynamic);

//One hundred dice roll;
const diceRoll = Array.from({ length: 100 }, () =>
  Math.round(Math.random() * 5 + 1)
);
console.log(diceRoll);

//grab the movements from the UI;

const bankDepositSum = accs => {
  const depositSum = accs
    .map(acc => acc.movements)
    .flat()
    .filter(acc => acc > 0)
    .reduce((acc, curr) => acc + curr, 0);
  return depositSum;
};
console.log(bankDepositSum(accounts));

//count the number of deposits atleast 1000$;
const countDeposit = accs => {
  // const deposits = accs
  //   .flatMap(acc => acc.movements)
  //   .filter((acc, i) => acc >= 1000);
  // return deposits.length;

  const deposit = accs
    .flatMap(acc => acc.movements)
    .reduce((acc, curr) => (curr >= 1000 ? acc + 1 : acc), 0);

  return deposit;
};
console.log(countDeposit(accounts));

const { deposits, withdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, curr) => {
      // curr > 0 ? (acc.deposits += curr) : (acc.withdrawal += curr);
      acc[curr > 0 ? 'deposits' : 'withdrawal'] += curr;
      return acc;
    },
    { deposits: 0, withdrawal: 0 }
  );

console.log(deposits, withdrawal);

//convert the string into title string;
//this is a nice title => This Is a Nice Title;

const converge = title => {
  const exception = ['a', 'an', 'the', 'but', 'or', 'and'];
  const titleArray = title.toLowerCase().split(' ');

  const capitalize = function (data) {
    return data[0].toUpperCase() + data.slice(1);
  };

  console.log(titleArray);

  const newArray = titleArray
    .map(data => (exception.includes(data) ? data : capitalize(data)))
    .join(' ');
  console.log(capitalize(newArray));
};
converge('this is a nice title');
converge('this is a LONG title but not too long');
converge('and here is another title with an example');

//Numbers

console.log(Number.parseInt('32px', 10)); //parseInt finds the number and print the number // glitch string should start with number
console.log(Number.parseInt('px32')); //this cannot works // second parameter is base 10

console.log(Number.parseFloat('2.5rem'));

console.log(Number.isNaN(+'20X')); //it indicates wether it's number or not

console.log(Number.isFinite(20 / 0));

//root;
console.log(Math.sqrt(36));
console.log(8 ** (1 / 3));
console.log(Math.max(23, 4, 5, 65, 6, 7, 87));
console.log(Math.min(23, 4, 5, 65, 6, 7, 87));

console.log(Math.PI * Number.parseInt('10px') ** 2);

const future = new Date();
console.log(future.toISOString());

const ingredients = ['olives', ''];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(
      `Pizza is delievered within 5mins which contains ${ing1} and ${ing2}`
    );
  },
  2000,
  ...ingredients
);
console.log('Waiting....');

if (ingredients.includes('spinach')) clearInterval(pizzaTimer);
