export const currencyFormatter = (value, locale='en-US', currency='USD') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)