const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const romanMap = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" },
];

function toRoman(num) {
  let n = num;
  let result = "";

  for (const { value, numeral } of romanMap) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }
  return result;
}

function handleConvert() {
  const raw = numberInput.value;

  if (raw === "") {
    output.textContent = "Please enter a valid number";
    return;
  }

  const n = Number(raw);

  if (Number.isNaN(n)) {
    output.textContent = "Please enter a valid number";
    return;
  }

  if (n < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (n >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  output.textContent = toRoman(n);
}

convertBtn.addEventListener("click", handleConvert);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleConvert();
});
