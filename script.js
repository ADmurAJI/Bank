"use strict";

// Аккаунты

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Выбор элементов
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".total__value--in");
const labelSumOut = document.querySelector(".total__value--out");
const labelSumInterest = document.querySelector(".total__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Функции

const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = "";
  transactions.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const transactionRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">2 дня назад</div>
          <div class="transactions__value">${trans}$</div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
};
displayTransactions(account1.transactions);

const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

createNicknames(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance}$`;
};
// displayBalance(account1.transactions);

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${depositesTotal}$`;

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${withdrawalsTotal}$`;

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest) => interest >= 5)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal}$`;
};

const updateUi = function (currentAccount) {
  // Отобразить транзакции

  displayTransactions(currentAccount.transactions);

  // Отобразить баланс

  displayBalance(currentAccount);

  // Отобразить итого

  displayTotal(currentAccount);
};

// displayTotal(account1.transactions);

let currentAccount;

// События

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (accounts) => accounts.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Обновить UI

    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Добро пожаловать, ${
      currentAccount.userName.split(" ")[0]
    }!`;

    // Очистить ввод

    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// Перевести деньги

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const recipienNicname = inputTransferTo.value;
  const recipienAccount = accounts.find(
    (account) => account.nickname === recipienNicname
  );
  const transferAmount = Number(inputTransferAmount.value);

  // Очистить ввод

  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    recipienAccount &&
    currentAccount.nickname !== recipienAccount?.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipienAccount.transactions.push(transferAmount);
    updateUi(currentAccount);
  }
});

// Закрыть счёт

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.nickname &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      (account) => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Войдите в свой аккаунт";
  }

  inputClosePin.value = "";
  inputCloseUsername.value = "";
});
