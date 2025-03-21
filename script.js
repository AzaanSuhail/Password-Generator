const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const form = document.getElementById("password-generator-form");
const includeUppercaseElements = document.getElementById("includeUppercase");
const includeNumbersElements = document.getElementById(
  "includeNumbersElements"
);
const includeSymbolsElements = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90); //! Refer ascii chart
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);

const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));




form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElements.checked;
  const includeNumbers = includeNumbersElements.checked;
  const includeSymbols = includeSymbolsElements.checked;

  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  passwordDisplay.value = password;
});


function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}


//copy to clipboard functionality
function copyToClipboard() {
  const passwordField = document.getElementById("passwordDisplay");
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile support
  document.execCommand("copy");

  alert("Password Copied Successfully !!");
}
