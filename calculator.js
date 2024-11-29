const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      // Clear all
      currentInput = "";
      previousInput = "";
      operator = "";
      updateScreen("");
    } else if (value === "=") {
      // Calculate the result
      if (previousInput && currentInput && operator) {
        currentInput = calculate(previousInput, currentInput, operator);
        previousInput = "";
        operator = "";
        updateScreen(currentInput);
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      // Operator input
      if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
        operator = value;
        updateScreen(previousInput + " " + operator);
      }
    } else {
      // Number or decimal input
      currentInput += value;
      updateScreen(currentInput);
    }
  });
});

function updateScreen(value) {
  screen.textContent = value;
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return "";
  }
}