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

// event logic
async function getRandomUserData() {
  const res = await fetch("https://randomuser.me/api");
  const { results } = await res.json();
  const user = results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
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
