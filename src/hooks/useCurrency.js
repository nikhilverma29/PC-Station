import { useConfigurator } from './useConfigurator';

const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.5,
  CAD: 1.36,
  AUD: 1.53,
  JPY: 149.5,
};

const SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
};

export function useCurrency() {
  const { currency, dispatch } = useConfigurator();
  const current = currency || 'INR';

  const formatPrice = (priceInUSD) => {
    const rate   = EXCHANGE_RATES[current] || 1;
    const symbol = SYMBOLS[current] || '$';
    const value  = priceInUSD * rate;

    // JPY and INR don't use decimal places
    if (current === 'JPY' || current === 'INR') {
      return `${symbol}${Math.round(value).toLocaleString()}`;
    }
    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const setCurrency = (c) => dispatch({ type: 'SET_CURRENCY', payload: c });

  return { currency: current, formatPrice, setCurrency };
}
