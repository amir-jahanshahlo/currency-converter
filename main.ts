// app.ts
const amountInput = document.getElementById("amount") as HTMLInputElement;
const result = document.getElementById("result") as HTMLElement;
const usdToIrrButton = document.getElementById(
  "usd-to-irr"
) as HTMLButtonElement;
const irrToUsdButton = document.getElementById(
  "irr-to-usd"
) as HTMLButtonElement;

const usdToIrrRate = 420000; // Example rate; adjust as needed
const irrToUsdRate = 1 / usdToIrrRate;

usdToIrrButton.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount)) {
    result.textContent = `${amount} USD = ${(amount * usdToIrrRate).toFixed(
      2
    )} IRR`;
  } else {
    result.textContent = "Please enter a valid amount.";
  }
});

irrToUsdButton.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount)) {
    result.textContent = `${amount} IRR = ${(amount * irrToUsdRate).toFixed(
      2
    )} USD`;
  } else {
    result.textContent = "Please enter a valid amount.";
  }
});
