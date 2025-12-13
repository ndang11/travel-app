export async function getExchangeRate(from, to) {
  try {
    const res = await fetch(
      `https://api.exchangerate.host/convert?from=${from}&to=${to}`
    );

    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Currency error:", error);
    return null;
  }
}
