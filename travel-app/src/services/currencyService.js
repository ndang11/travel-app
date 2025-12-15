const BASE_URL = import.meta.env.VITE_EXCHANGE_RATE_API;

/**
 * Get exchange rate between two currencies
 * @param {string} from - base currency (e.g. USD)
 * @param {string} to - target currency (e.g. EUR)
 */
export async function getExchangeRate(from, to) {
  try {
    if (!from || !to) {
      throw new Error("Missing currency codes");
    }

    const res = await fetch(
      `${BASE_URL}/convert?from=${from}&to=${to}`
    );

    if (!res.ok) {
      throw new Error("ExchangeRate API request failed");
    }

    const data = await res.json();

    if (!data?.result) {
      throw new Error("Invalid exchange rate response");
    }

    return data.result;
  } catch (error) {
    console.error("Currency error:", error.message);
    return null;
  }
}
