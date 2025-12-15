const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export async function getExchangeRate(from, to) {
  try {
    if (!API_KEY) throw new Error("Missing ExchangeRate API key");

    const res = await fetch(`${BASE_URL}/${API_KEY}/latest/${from}`);

    if (!res.ok) throw new Error("Exchange rate request failed");

    const data = await res.json();

    if (data.result !== "success") {
      throw new Error(data["error-type"] || "API error");
    }

    return data.conversion_rates?.[to] || null;
  } catch (error) {
    console.error("Currency error:", error.message);
    return null;
  }
}

export function detectUserCurrency() {
  const locale = navigator.language || "en-US";

  const map = {
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
  };

  return map[locale] || "USD";
}
