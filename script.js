const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

async function getRandomUserData() {
  const res = await fetch("https://randomuser.me/api");
  const { results } = await res.json();
  const user = results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random * 1000000),
  };

  addData(newUser);
}

function addData(newUser) {
  data.push(newUser);
}

getRandomUserData();
