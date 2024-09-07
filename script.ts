// Define an interface to specify the structure of the country list object
interface CountryList {
  [key: string]: string;
}

// Define the country list object with type safety
const countrylist: CountryList = {
  USD: "US",
  IRR: "IR",
  // Add other currency codes and country codes as needed
};

// Select DOM elements with type annotations
const dropList = document.querySelectorAll<HTMLSelectElement>("form select");
const fromcurrency = document.querySelector<HTMLSelectElement>(".from select")!;
const tocurrency = document.querySelector<HTMLSelectElement>(".to select")!;
const getButton = document.querySelector<HTMLButtonElement>("form button")!;
const exchangeIcon = document.querySelector<HTMLDivElement>("form .icon")!;

// Populate dropdown lists with currency options
dropList.forEach((select, index) => {
  for (const currencyCode in countrylist) {
    const isSelected =
      index === 0
        ? currencyCode === "USD"
          ? "selected"
          : ""
        : currencyCode === "IRR"
        ? "selected"
        : "";
    const optionTag = `<option value="${currencyCode}" ${isSelected}>${currencyCode}</option>`;
    select.insertAdjacentHTML("beforeend", optionTag);
  }
  select.addEventListener("change", (e) =>
    loadFlag(e.target as HTMLSelectElement)
  );
});

// Load the flag image for the selected currency
function loadFlag(element: HTMLSelectElement): void {
  const selectedCurrency = element.value;
  const countryCode = countrylist[selectedCurrency];
  const imgTag = element.parentElement?.querySelector<HTMLImageElement>("img");
  if (imgTag && countryCode) {
    imgTag.src = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  }
}

// Load exchange rates when the page loads
window.addEventListener("load", getExchangeRate);

// Fetch and display the exchange rate when the button is clicked
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

// Swap the selected currencies when the exchange icon is clicked
exchangeIcon.addEventListener("click", () => {
  const tempCode = fromcurrency.value;
  fromcurrency.value = tocurrency.value;
  tocurrency.value = tempCode;
  loadFlag(fromcurrency);
  loadFlag(tocurrency);
  getExchangeRate();
});

// Function to fetch and display the exchange rate
function getExchangeRate(): void {
  const amountInput = document.querySelector<HTMLInputElement>("form input")!;
  const exchangeRateText = document.querySelector<HTMLDivElement>(
    "form .exchange-rate"
  )!;
  let amountValue = parseFloat(amountInput.value) || 1;
  if (amountValue <= 0) {
    amountInput.value = "1";
    amountValue = 1;
  }
  exchangeRateText.innerText = "Getting exchange rate...";
  const url = `https://v6.exchangerate-api.com/v6/53193a11286aaac6edcec814/latest/${fromcurrency.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const exchangeRate = result.conversion_rates[tocurrency.value];
      const totalExRate = (amountValue * exchangeRate).toFixed(2);
      exchangeRateText.innerText = `${amountValue} ${fromcurrency.value} = ${totalExRate} ${tocurrency.value}`;
    })
    .catch(() => {
      exchangeRateText.innerText = "Something went wrong";
    });
}
