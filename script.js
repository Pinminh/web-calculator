// References to buttons and displays
const iptBox = document.querySelector("#input");
const optBox = document.querySelector("#output");
const numpd0 = document.querySelector("#num0");
const numpd1 = document.querySelector("#num1");
const numpd2 = document.querySelector("#num2");
const numpd3 = document.querySelector("#num3");
const numpd4 = document.querySelector("#num4");
const numpd5 = document.querySelector("#num5");
const numpd6 = document.querySelector("#num6");
const numpd7 = document.querySelector("#num7");
const numpd8 = document.querySelector("#num8");
const numpd9 = document.querySelector("#num9");
const addBtn = document.querySelector("#add");
const subBtn = document.querySelector("#subtract");
const mulBtn = document.querySelector("#multiply");
const divBtn = document.querySelector("#divide");
const eqlBtn = document.querySelector("#equal");
const clrBtn = document.querySelector("#clear");
const delBtn = document.querySelector("#delete");
const dotBtn = document.querySelector("#decimal");

// Intial state of displays and buttons
let failed = false;

const clearDisplay = () => iptBox.textContent = optBox.textContent = "";

const toggleOperator = (enabled) => {
  addBtn.disabled = subBtn.disabled = mulBtn.disabled = divBtn.disabled = !enabled;
};

const toggleCleaner = (enabled) => {
  clrBtn.disabled = delBtn.disabled = !enabled;
};

const toggleDelete = (enabled) => delBtn.disabled = !enabled;

const toggleEqual = (enabled) => eqlBtn.disabled = !enabled;

const toggleDecimal = (enabled) => dotBtn.disabled = !enabled;

const toggleNumber = (enabled) => {
  numpd0.disabled = !enabled;
  numpd1.disabled = numpd2.disabled = numpd3.disabled = !enabled;
  numpd4.disabled = numpd5.disabled = numpd6.disabled = !enabled;
  numpd7.disabled = numpd8.disabled = numpd9.disabled = !enabled;
};

const toggleFailedState = (isFail) => failed = isFail;

// Computation variables
let lhsIn;
let oprtr;
let rhsIn;
let answer = 0;

const resetToIntialState = () => {
  clearDisplay();
  toggleOperator(false);
  toggleCleaner(false);
  toggleEqual(false);
  toggleDecimal(false);
  toggleNumber(true);
  toggleFailedState(false);

  lhsIn = "";
  oprtr = "";
  rhsIn = "";
};

resetToIntialState();

const inputNumber = function (digit) {
  if (iptBox.textContent.length <= 0) toggleOperator(true);
  toggleCleaner(true);
  toggleDecimal(true);
  toggleEqual(true);

  if (iptBox.textContent.length <= 0 || Number(iptBox.textContent))
    lhsIn += digit;
  else
    rhsIn += digit;

  iptBox.textContent += digit;
};

const inputOperator = function (operator) {
  toggleNumber(true);
  toggleOperator(false);
  toggleEqual(false);
  toggleCleaner(true);

  if (optBox.textContent.length > 0 || failed) {
    failed = false;
    lhsIn = answer;
    rhsIn = "";
    clearDisplay();
    iptBox.textContent = "ANS";
  }

  oprtr = operator;

  let opStr = null;
  switch (operator) {
    case "add": opStr = "&plus;"; break;
    case "sub": opStr = "&minus;"; break;
    case "mul": opStr = "&times;"; break;
    case "div": opStr = "&divide;"; break;
  }

  iptBox.innerHTML += ` ${opStr} `;
};

const performCalculation = () => {
  toggleNumber(false);
  toggleOperator(true);
  toggleDecimal(false);
  toggleDelete(false);

  const lhs = Number(lhsIn);
  const rhs = Number(rhsIn);
  let ans = answer;

  switch (oprtr) {
    case "add": ans = lhs + rhs; break;
    case "sub": ans = lhs - rhs; break;
    case "mul": ans = lhs * rhs; break;
    case "div": ans = (rhs === 0) ? "Can't divide by zero" : (lhs / rhs); break;
    default: ans = lhs;
  }

  optBox.textContent = ans;

  if (Number(ans)) answer = ans;
  else toggleFailedState(true);
};

const revertChange = () => {
  if (iptBox.textContent.length <= 0) return;

  const numDeleteChars = (oprtr.length > 0 && rhsIn.length <= 0) ? 3 : 1;
  iptBox.textContent = iptBox.textContent.slice(0, iptBox.textContent.length - numDeleteChars);

  if (iptBox.textContent === "ANS") toggleDelete(false) && toggleNumber(false);

  if (lhsIn.length <= 1 && oprtr.length <= 0) {
    resetToIntialState();
  } else if (lhsIn.length > 1 && oprtr.length <= 0) {
    lhsIn = lhsIn.slice(0, lhsIn.length - 1);
  } else if (oprtr.length > 0 && rhsIn.length <= 0) {
    oprtr = ""; toggleOperator(true);
  } else if (rhsIn.length > 0) {
    rhsIn = rhsIn.slice(0, rhsIn.length - 1);
  }
}

const manageClickButtons = (event) => {
  switch (event.target.id) {
    case "num0": inputNumber(0); break;
    case "num1": inputNumber(1); break;
    case "num2": inputNumber(2); break;
    case "num3": inputNumber(3); break;
    case "num4": inputNumber(4); break;
    case "num5": inputNumber(5); break;
    case "num6": inputNumber(6); break;
    case "num7": inputNumber(7); break;
    case "num8": inputNumber(8); break;
    case "num9": inputNumber(9); break;

    case "add": inputOperator("add"); break;
    case "subtract": inputOperator("sub"); break;
    case "multiply": inputOperator("mul"); break;
    case "divide": inputOperator("div"); break;
    case "equal": performCalculation(); break;

    case "clear": resetToIntialState(); break;
    case "delete": revertChange(); break;
  }
};

const managePressKeys = (event) => {
  switch (event.key) {
    case "0": numpd0.click(); break;
    case "1": numpd1.click(); break;
    case "2": numpd2.click(); break;
    case "3": numpd3.click(); break;
    case "4": numpd4.click(); break;
    case "5": numpd5.click(); break;
    case "6": numpd6.click(); break;
    case "7": numpd7.click(); break;
    case "8": numpd8.click(); break;
    case "9": numpd9.click(); break;

    case "+": addBtn.click(); break;
    case "-": subBtn.click(); break;
    case "*": mulBtn.click(); break;
    case "/": divBtn.click(); break;

    case "Enter":
    case "=": eqlBtn.click(); break;

    case "Escape": clrBtn.click(); break;

    case "Backspace":
    case "Delete": delBtn.click(); break;
  }
}

document.addEventListener("click", manageClickButtons);
document.addEventListener("keydown", managePressKeys);