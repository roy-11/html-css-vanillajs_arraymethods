// element
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

// data & initialize
let data = [];
getRandomUserData();
getRandomUserData();
getRandomUserData();

// event
addUserBtn.addEventListener("click", getRandomUserData);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichiest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
// event logic
async function getRandomUserData() {
  const res = await fetch("https://randomuser.me/api");
  const { results } = await res.json();
  const user = results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000 * 2),
  };

  addData(newUser);
}

function addData(newUser) {
  data.push(newUser);
  updateDom();
}

function updateDom(privateData = data) {
  // Clear main div
  main.innerHTML = " <h2><strong>Person</strong> Wealth</h2>";

  // Create new DOM
  privateData.forEach((user) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(element);
  });
}

function formatMoney(money) {
  return "$" + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

function sortByRichiest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => {
    return acc + user.money;
  }, 0);

  const wealthEl = document.getElementById("wealth");
  if (!wealthEl) {
    const wealthEl = document.createElement("div");
    wealthEl.innerHTML = `<h3 id="wealth">Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
  }
  wealthEl.innerHTML = `Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
}
