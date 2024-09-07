// Define the country list object with type safety
var countrylist = {
    USD: "US",
    IRR: "IR"
};
// Select DOM elements with type annotations
var dropList = document.querySelectorAll("form select");
var fromcurrency = document.querySelector(".from select");
var tocurrency = document.querySelector(".to select");
var getButton = document.querySelector("form button");
var exchangeIcon = document.querySelector("form .icon");
// Populate dropdown lists with currency options
dropList.forEach(function (select, index) {
    for (var currencyCode in countrylist) {
        var isSelected = index === 0
            ? currencyCode === "USD"
                ? "selected"
                : ""
            : currencyCode === "IRR"
                ? "selected"
                : "";
        var optionTag = "<option value=\"".concat(currencyCode, "\" ").concat(isSelected, ">").concat(currencyCode, "</option>");
        select.insertAdjacentHTML("beforeend", optionTag);
    }
    select.addEventListener("change", function (e) {
        return loadFlag(e.target);
    });
});
// Load the flag image for the selected currency
function loadFlag(element) {
    var _a;
    var selectedCurrency = element.value;
    var countryCode = countrylist[selectedCurrency];
    var imgTag = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("img");
    if (imgTag && countryCode) {
        imgTag.src = "https://flagcdn.com/48x36/".concat(countryCode.toLowerCase(), ".png");
    }
}
// Load exchange rates when the page loads
window.addEventListener("load", getExchangeRate);
// Fetch and display the exchange rate when the button is clicked
getButton.addEventListener("click", function (e) {
    e.preventDefault();
    getExchangeRate();
});
// Swap the selected currencies when the exchange icon is clicked
exchangeIcon.addEventListener("click", function () {
    var tempCode = fromcurrency.value;
    fromcurrency.value = tocurrency.value;
    tocurrency.value = tempCode;
    loadFlag(fromcurrency);
    loadFlag(tocurrency);
    getExchangeRate();
});
// Function to fetch and display the exchange rate
function getExchangeRate() {
    var amountInput = document.querySelector("form input");
    var exchangeRateText = document.querySelector("form .exchange-rate");
    var amountValue = parseFloat(amountInput.value) || 1;
    if (amountValue <= 0) {
        amountInput.value = "1";
        amountValue = 1;
    }
    exchangeRateText.innerText = "Getting exchange rate...";
    var url = "https://v6.exchangerate-api.com/v6/53193a11286aaac6edcec814/latest/".concat(fromcurrency.value);
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (result) {
        var exchangeRate = result.conversion_rates[tocurrency.value];
        var totalExRate = (amountValue * exchangeRate).toFixed(2);
        exchangeRateText.innerText = "".concat(amountValue, " ").concat(fromcurrency.value, " = ").concat(totalExRate, " ").concat(tocurrency.value);
    })["catch"](function () {
        exchangeRateText.innerText = "Something went wrong";
    });
}
