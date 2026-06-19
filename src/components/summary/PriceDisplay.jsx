import { useEffect, useState } from 'react';

export default function PriceDisplay({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Simple fast count up/down animation
    const duration = 300; // ms
    const steps = 15;
    const stepTime = duration / steps;
    const diff = value - displayValue;
    
    if (diff === 0) return;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(prev => prev + (diff / steps));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, displayValue]);

  return (
    <span className="text-2xl font-bold tracking-tight tabular-nums text-primary">
      ${Math.round(displayValue).toLocaleString()}
    </span>
  );
}
