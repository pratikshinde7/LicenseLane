/*
  Calculator logic and UI interactions
  - Handles digit input, operators, equals, clear, delete, percent, sign toggle
  - Supports keyboard controls
  - Formats numbers for display while preserving input fidelity
*/

(function () {
  /** @typedef {"+"|"-"|"*"|"/"|null} BinaryOperator */

  /** Global calculator state */
  const state = {
    /** @type {string} */ currentOperand: "0",
    /** @type {string|null} */ previousOperand: null,
    /** @type {BinaryOperator} */ operator: null,
    /** @type {boolean} */ overwriteOnNextDigit: false,
  };

  const previousEl = document.getElementById("previous-operand");
  const currentEl = document.getElementById("current-operand");
  const calculatorEl = document.querySelector(".calculator");

  /** Updates the visible display from state */
  function updateDisplay() {
    if (state.previousOperand !== null && state.operator) {
      previousEl.textContent = `${formatForDisplay(state.previousOperand)} ${operatorToSymbol(state.operator)}`;
    } else {
      previousEl.textContent = "";
    }

    currentEl.textContent = formatForDisplay(state.currentOperand);
  }

  /** Converts operator to readable symbol */
  function operatorToSymbol(op) {
    switch (op) {
      case "+": return "+";
      case "-": return "−";
      case "*": return "×";
      case "/": return "÷";
      default: return "";
    }
  }

  /**
   * Formats a numeric string for display, grouping integer part and retaining decimals.
   * Avoids altering raw input such as trailing decimal point.
   */
  function formatForDisplay(valueStr) {
    if (valueStr === "") return "0";
    if (valueStr === "-") return "-";

    if (valueStr.includes("e") || valueStr.includes("E")) {
      return valueStr;
    }

    const isNegative = valueStr.startsWith("-");
    const absStr = isNegative ? valueStr.slice(1) : valueStr;

    const [intPart, decPart] = absStr.split(".");
    const intNum = Number(intPart || "0");
    const groupedInt = new Intl.NumberFormat(undefined).format(intNum);
    const combined = decPart !== undefined ? `${groupedInt}.${decPart}` : groupedInt;

    return isNegative ? `-${combined}` : combined;
  }

  /** Clears all state */
  function handleClear() {
    state.currentOperand = "0";
    state.previousOperand = null;
    state.operator = null;
    state.overwriteOnNextDigit = false;
    updateDisplay();
  }

  /** Deletes last character from current operand */
  function handleDelete() {
    if (state.overwriteOnNextDigit) {
      state.currentOperand = "0";
      state.overwriteOnNextDigit = false;
      updateDisplay();
      return;
    }

    if (state.currentOperand.length <= 1 || (state.currentOperand.length === 2 && state.currentOperand.startsWith("-"))) {
      state.currentOperand = "0";
    } else {
      state.currentOperand = state.currentOperand.slice(0, -1);
    }
    updateDisplay();
  }

  /** Toggles the sign of current operand */
  function handleSignToggle() {
    if (state.currentOperand === "0") return;
    if (state.currentOperand.startsWith("-")) {
      state.currentOperand = state.currentOperand.slice(1);
    } else {
      state.currentOperand = "-" + state.currentOperand;
    }
    updateDisplay();
  }

  /** Applies percent logic:
   *  - For + or -: x op (x * y/100)
   *  - For * or /: x op (y/100)
   *  - No operator: y/100
   */
  function handlePercent() {
    const current = parseInputNumber(state.currentOperand);
    if (state.previousOperand !== null && state.operator) {
      const base = parseInputNumber(state.previousOperand);
      let percentValue;
      if (state.operator === "+" || state.operator === "-") {
        percentValue = safeMultiply(base, safeDivide(current, 100));
      } else {
        percentValue = safeDivide(current, 100);
      }
      state.currentOperand = normalizeNumberString(percentValue);
    } else {
      const percentValue = safeDivide(current, 100);
      state.currentOperand = normalizeNumberString(percentValue);
    }
    state.overwriteOnNextDigit = true;
    updateDisplay();
  }

  /** Handles digit and decimal input */
  function handleDigitInput(raw) {
    if (state.overwriteOnNextDigit) {
      state.currentOperand = raw === "." ? "0." : raw;
      state.overwriteOnNextDigit = false;
      updateDisplay();
      return;
    }

    if (raw === ".") {
      if (state.currentOperand.includes(".")) return;
      state.currentOperand += ".";
      updateDisplay();
      return;
    }

    if (state.currentOperand === "0") {
      state.currentOperand = raw;
    } else if (state.currentOperand === "-0") {
      state.currentOperand = "-" + raw;
    } else {
      state.currentOperand += raw;
    }
    updateDisplay();
  }

  /** Chooses an operator and possibly performs a pending evaluation */
  function handleOperator(nextOp) {
    if (state.operator && state.previousOperand !== null && !state.overwriteOnNextDigit) {
      // Chain calculation like typical calculators
      const result = evaluateExpression();
      state.previousOperand = normalizeNumberString(result);
      state.currentOperand = "0";
      state.operator = nextOp;
      state.overwriteOnNextDigit = false;
      updateDisplay();
      return;
    }

    state.previousOperand = state.currentOperand;
    state.currentOperand = "0";
    state.operator = nextOp;
    state.overwriteOnNextDigit = false;
    updateDisplay();
  }

  /** Computes the result of previous operator with current */
  function handleEquals() {
    if (!state.operator || state.previousOperand === null) return;
    const result = evaluateExpression();
    state.currentOperand = normalizeNumberString(result);
    state.previousOperand = null;
    state.operator = null;
    state.overwriteOnNextDigit = true;
    updateDisplay();
  }

  /** Parses numeric string into Number, handling leading dots and trailing decimals */
  function parseInputNumber(str) {
    if (str === "") return 0;
    if (str === "-") return 0;
    if (str.endsWith(".")) return Number(str.slice(0, -1));
    return Number(str);
  }

  /**
   * Normalizes a JS number to a string suitable for display and further input,
   * trimming insignificant zeros while avoiding scientific notation for usual ranges.
   */
  function normalizeNumberString(num) {
    if (!Number.isFinite(num)) return num.toString();

    const abs = Math.abs(num);
    if (abs !== 0 && (abs < 1e-6 || abs >= 1e15)) {
      return num.toString();
    }

    let str = num.toFixed(12);
    str = str.replace(/\.0+$/, "");
    str = str.replace(/(\.\d*?)0+$/, "$1");
    if (str.endsWith(".")) str = str.slice(0, -1);
    if (str === "-0") str = "0";
    return str;
  }

  /** Executes the binary operation */
  function evaluateExpression() {
    const a = parseInputNumber(state.previousOperand);
    const b = parseInputNumber(state.currentOperand);

    switch (state.operator) {
      case "+":
        return safeAdd(a, b);
      case "-":
        return safeSubtract(a, b);
      case "*":
        return safeMultiply(a, b);
      case "/":
        return b === 0 ? NaN : safeDivide(a, b);
      default:
        return b;
    }
  }

  // Basic decimal-safe ops using scaling approach
  function decimalPlaces(n) {
    const s = n.toString();
    if (!s.includes(".")) return 0;
    return s.split(".")[1].length;
  }

  function scaleFactor(a, b) {
    return 10 ** Math.max(decimalPlaces(a), decimalPlaces(b));
  }

  function safeAdd(a, b) {
    const f = scaleFactor(a, b);
    return (Math.round(a * f) + Math.round(b * f)) / f;
  }

  function safeSubtract(a, b) {
    const f = scaleFactor(a, b);
    return (Math.round(a * f) - Math.round(b * f)) / f;
  }

  function safeMultiply(a, b) {
    const fa = 10 ** decimalPlaces(a);
    const fb = 10 ** decimalPlaces(b);
    return (Math.round(a * fa) * Math.round(b * fb)) / (fa * fb);
  }

  function safeDivide(a, b) {
    const fa = 10 ** decimalPlaces(a);
    const fb = 10 ** decimalPlaces(b);
    return (Math.round(a * fa) / Math.round(b * fb));
  }

  /** Handles button clicks through event delegation */
  function onCalculatorClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (!target.matches(".btn")) return;

    const action = target.getAttribute("data-action");
    const value = target.getAttribute("data-value");

    switch (action) {
      case "digit":
        handleDigitInput(String(value));
        break;
      case "operator":
        handleOperator(/** @type {BinaryOperator} */ (value));
        break;
      case "equals":
        handleEquals();
        break;
      case "clear":
        handleClear();
        break;
      case "delete":
        handleDelete();
        break;
      case "percent":
        handlePercent();
        break;
      case "sign":
        handleSignToggle();
        break;
    }

    target.blur();
  }

  /** Maps keyboard keys to calculator actions */
  function onKeyDown(event) {
    const key = event.key;

    if (/^\d$/.test(key)) {
      handleDigitInput(key);
      event.preventDefault();
      return;
    }

    if (key === ".") {
      handleDigitInput(".");
      event.preventDefault();
      return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(/** @type {BinaryOperator} */ (key));
      event.preventDefault();
      return;
    }

    if (key === "Enter" || key === "=") {
      handleEquals();
      event.preventDefault();
      return;
    }

    if (key === "Backspace") {
      handleDelete();
      event.preventDefault();
      return;
    }

    if (key === "Delete" || key === "Escape") {
      handleClear();
      event.preventDefault();
      return;
    }

    if (key === "%" || key.toLowerCase() === "p") {
      handlePercent();
      event.preventDefault();
      return;
    }

    if (key === "F9") {
      handleSignToggle();
      event.preventDefault();
      return;
    }
  }

  calculatorEl.addEventListener("click", onCalculatorClick);
  window.addEventListener("keydown", onKeyDown);

  updateDisplay();
})();
