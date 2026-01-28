const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

const usPhoneRegex =
  /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;

function isValidUSPhone(str) {
  return usPhoneRegex.test(str);
}

function addResultLine(text) {
  const line = document.createElement("p");
  line.textContent = text;
  line.style.margin = "0";
  resultsDiv.appendChild(line);
}

checkBtn.addEventListener("click", () => {
  const value = userInput.value;

  if (!value) {
    alert("Please provide a phone number");
    return;
  }

  const valid = isValidUSPhone(value);
  addResultLine(`${valid ? "Valid" : "Invalid"} US number: ${value}`);
});

clearBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
});
