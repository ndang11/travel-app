const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

if (!API_KEY) {
  console.warn("ExchangeRate API key is missing. Set VITE_EXCHANGE_RATE_API_KEY in .env file");
}

/**
 * Get exchange rate between two currencies
 * @param {string} from - Source currency code (e.g., "USD")
 * @param {string} to - Target currency code (e.g., "EUR")
 * @returns {Promise<number|null>} Exchange rate or null
 */
export async function getExchangeRate(from, to) {
  if (!from || !to) return null;
  
  if (!API_KEY) {
    console.warn("ExchangeRate API key missing");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "API error");
    }

    return data.conversion_rates?.[to] || null;
  } catch (error) {
    console.error("getExchangeRate error:", error.message);
    return null;
  }
}

/**
 * Get all exchange rates for a currency
 * @param {string} from - Source currency code
 * @returns {Promise<Object|null>} All conversion rates
 */
export async function getAllRates(from = "USD") {
  if (!from) return null;

  if (!API_KEY) {
    console.warn("ExchangeRate API key missing");
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);

    if (!response.ok) {
      throw new Error(`Exchange rate API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "API error");
    }

    return data.conversion_rates || null;
  } catch (error) {
    console.error("getAllRates error:", error.message);
    return null;
  }
}

/**
 * Detect user's currency based on browser locale
 * @returns {string} Currency code
 */
export function detectUserCurrency() {
  const locale = navigator.language || "en-US";

  const currencyMap = {
    "en-US": "USD",
    "en-GB": "GBP",
    "fr-FR": "EUR",
    "de-DE": "EUR",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "pt-BR": "BRL",
    "en-CA": "CAD",
    "ja-JP": "JPY",
    "zh-CN": "CNY",
    "en-AU": "AUD",
    "en-NZ": "NZD",
    "en-SG": "SGD",
  };

  return currencyMap[locale] || "USD";
}

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} from - Source currency
 * @param {string} to - Target currency
 * @returns {Promise<number>} Converted amount
 */
export async function convertCurrency(amount, from, to) {
  const rate = await getExchangeRate(from, to);
  if (!rate) return amount;
  return amount * rate;
}
