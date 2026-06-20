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

  const formatPrice = (priceInUSD) => {
    // If we somehow don't have a currency yet, default to INR
    const currentCurrency = currency || 'INR';
    const rate = EXCHANGE_RATES[currentCurrency] || 1;
    const symbol = SYMBOLS[currentCurrency] || '$';
    const converted = priceInUSD * rate;
    
    // Formatting rules: JPY and INR show 0 decimal places, others show 2
    if (currentCurrency === 'JPY' || currentCurrency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    } else {
      // For USD, EUR, GBP, CAD, AUD, we show two decimal places but we'll use 
      // the standard localized string logic so it includes commas (e.g. 1,200.50)
      return `${symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const setCurrency = (c) => dispatch({ type: 'SET_CURRENCY', payload: c });

  return { currency: currency || 'INR', formatPrice, setCurrency };
}
