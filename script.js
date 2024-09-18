const API_KEY = "9d74faa4a852a3bfa0022476";

const CURRENCIES = [
  // Liste des devises disponibles
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

const fromCurrency = document.getElementById("from"); // Récupération de l'input avec la devise de départ
const toCurrency = document.getElementById("to"); // Récupération de l'input avec la devise souhaitée

CURRENCIES.forEach((currency) => {
  // Ajout des options dans les inputs
  const option = document.createElement("option");
  option.value = currency;
  option.innerText = currency;
  fromCurrency.appendChild(option);
  toCurrency.appendChild(option.cloneNode(true));
});

const amount = document.getElementById("amount"); // Récupération de l'input avec le montant
const result = document.getElementById("result"); // Récupération de l'input avec la conversion du montant
const conversionRateInput = document.getElementById("conversionRate"); // Récupération de l'input avec le taux de conversion
const from = fromCurrency.value;
const to = toCurrency.value;

// Quand le from et le to changent, on réinitialise le montant
fromCurrency.addEventListener("change", () => {
  amount.value = "";
  result.innerText = "0.00";
  conversionRateInput.innerText = "0.00";
});

toCurrency.addEventListener("change", () => {
  amount.value = "";
  result.innerText = "0.00";
  conversionRateInput.innerText = "0.00";
});

amount.addEventListener("input", async (event) => {
  // Ajout d'un listener sur l'input pour la conversion
  const value = event.target.value;

  if (value === "" || value === null || isNaN(value) || value <= 0) {
    // Si le montant est invalide
    result.innerText = "0.00";
    conversionRateInput.innerText = "0.00"; // Réinitialise le taux de conversion affiché
    return;
  }

  try {
    const response = await fetch(
      // Envoie de la requête à l'API
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${value}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (!response.ok)
      throw new Error(`HTTP erreur! statut: ${response.status}`);
    const data = await response.json(); // Récupération de la réponse
    if (data.result === "error") throw new Error(data["error-type"]);

    const conversionRate = data.conversion_rate; // Récupération du taux de conversion
    conversionRateInput.innerText = conversionRate.toFixed(2); // Affichage du taux de conversion arrondie à 2 décimales

    const convertedAmount = data.conversion_result; // Récupération de la conversion
    result.innerText = convertedAmount.toFixed(2); // Affichage de la conversion arrondie à 2 décimales
  } catch (error) {
    console.log(error);
    result.innerText = "0.00";
    conversionRateInput.innerText = "0.00"; // Afficher 0.00 si une erreur se produit
  }
});
