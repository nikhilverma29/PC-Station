import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder = 'Select',
  className,
  noneOption = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between rounded-md border border-input bg-card/60 px-3 py-1.5 text-sm font-medium text-white shadow-sm focus:outline-none cursor-pointer',
          className
        )}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-current" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-max min-w-full rounded-md border border-input bg-black shadow-xl py-1 overflow-hidden">
          <ul className="flex flex-col max-h-[50vh] overflow-y-auto no-scrollbar">
            {options.map((opt) => {
              if (opt.disabled) return null;
              const isSelected = value === opt.value;
              const itemLabel = opt.displayLabel || opt.label;
              
              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    className={cn(
                      'w-full text-left px-4 py-2 text-sm transition-all duration-300 rounded-sm',
                      isSelected
                        ? 'bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_15px_rgba(255,255,255,0.15)] text-white font-bold tracking-wide'
                        : 'text-white hover:bg-gradient-to-r hover:from-white/15 hover:to-white/5 hover:backdrop-blur-md hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_15px_rgba(255,255,255,0.15)]'
                    )}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                  >
                    {itemLabel}
                  </button>
                </li>
              );
            })}
            
            {noneOption && (
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 text-sm text-white transition-all duration-300 rounded-sm hover:bg-gradient-to-r hover:from-white/15 hover:to-white/5 hover:backdrop-blur-md hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_15px_rgba(255,255,255,0.15)]"
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                  }}
                >
                  None
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
