const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultEl = document.getElementById("result");

function isPalindrome(raw) {
  const cleaned = raw.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversed = cleaned.split("").reverse().join("");
  return cleaned === reversed;
}

function handleCheck() {
  const value = textInput.value;

  if (!value) {
    alert("Please input a value.");
    return;
  }

  const ok = isPalindrome(value);
  resultEl.textContent = `${value} is ${ok ? "" : "not "}a palindrome.`;
}

checkBtn.addEventListener("click", handleCheck);

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCheck();
});
