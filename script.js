"use strict";

// Аккаунты

const account1 = {
  userName: "Cecil Ireland",
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    "2021-10-02T14:43:31.074Z",
    "2021-10-29T11:24:19.761Z",
    "2021-11-15T10:45:23.907Z",
    "2022-11-21T12:17:46.255Z",
    "2022-11-22T15:14:06.486Z",
    "2022-11-23T11:42:26.371Z",
    "2022-11-24T07:43:59.331Z",
    "2022-11-25T15:21:20.814Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  userName: "Amani Salt",
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    "2021-10-02T14:43:31.074Z",
    "2021-10-29T11:24:19.761Z",
    "2021-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
    "2022-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "UAH",
  locale: "uk-UA",
};

const account3 = {
  userName: "Corey Martinez",
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    "2021-10-02T14:43:31.074Z",
    "2021-10-29T11:24:19.761Z",
    "2021-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
    "2022-03-09T11:42:26.371Z",
    "2022-05-21T07:43:59.331Z",
    "2022-06-22T15:21:20.814Z",
  ],
  currency: "RUB",
  locale: "ru-RU",
};

const account4 = {
  userName: "Kamile Searle",
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    "2021-10-02T14:43:31.074Z",
    "2021-10-29T11:24:19.761Z",
    "2021-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
  ],
  currency: "EUR",
  locale: "fr-CA",
};

const account5 = {
  userName: "Oliver Avila",
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    "2021-10-02T14:43:31.074Z",
    "2021-10-29T11:24:19.761Z",
    "2021-11-15T10:45:23.907Z",
    "2022-01-22T12:17:46.255Z",
    "2022-02-12T15:14:06.486Z",
  ],
  currency: "USD",
  locale: "en-US",
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

// Дата

const formatTransactionDate = function (date, locale) {
  const day = `${date.getDate()}`.padStart(2, "0");
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const year = date.getFullYear();

  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return "Сегодня";
  if (daysPassed === 1) return "Вчера";
  if (daysPassed <= 4) return `${daysPassed} дня назад`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Показать транзакции

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = "";

  // Сортировать транзакции

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? "deposit" : "withdrawal";
    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    const transactionRow = `
    <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${trans.toFixed(2)}$</div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML("afterbegin", transactionRow);
  });
};

// Добавить никнейм в аккаунт

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

// Показать баланс

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${depositesTotal.toFixed(2)}$`;

  const withdrawalsTotal = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${withdrawalsTotal.toFixed(2)}$`;

  const interestTotal = account.transactions
    .filter((trans) => trans > 0)
    .map((depos) => (depos * account.interest) / 100)
    .filter((interest) => interest >= 5)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

const updateUi = function (account) {
  // Отобразить транзакции

  displayTransactions(account);

  // Отобразить баланс

  displayBalance(account);

  // Отобразить итого

  displayTotal(account);
};

let currentAccount;

// Всегда залогинен

// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

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

    const nowDate = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(nowDate);

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

  // Добавть транзакции

  if (
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    recipienAccount &&
    currentAccount.nickname !== recipienAccount?.nickname
  ) {
    currentAccount.transactions.push(-transferAmount);
    recipienAccount.transactions.push(transferAmount);

    // Добавить дату транзакции

    currentAccount.transactionsDates.push(new Date());
    recipienAccount.transactionsDates.push(new Date());

    updateUi(currentAccount);
  }
});

// Запросить займ

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(Number(inputLoanAmount.value));

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(
      (trans) => trans >= (loanAmount * 10) / 100
    )
  ) {
    currentAccount.transactions.push(loanAmount);
    currentAccount.transactionsDates.push(new Date());
    updateUi(currentAccount);
  }
  inputLoanAmount.value = "";
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

// Сортировать транзакции

let transactionsSorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
