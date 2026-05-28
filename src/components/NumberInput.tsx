import React, { useState, useEffect } from 'react';

interface NumberInputProps {
  value: number;
  onChange: (val: number) => void;
  className?: string;
}

export default function NumberInput({ value, onChange, className = '' }: NumberInputProps) {
  const [localValue, setLocalValue] = useState<string>(value.toString());
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Sync external value to local state if it differs numerically
    // This allows intermediate typing like "25." without being wiped out
    if (localValue === '') return;
    if (Number(localValue) !== value) {
      setLocalValue(value.toString());
      setError(false);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    
    if (val === '') {
      setError(true);
      // Pass 0 to parent so the math doesn't crash, but keep local string empty
      onChange(0);
    } else {
      setError(false);
      onChange(Number(val));
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <input 
        type="number"
        className={`${className} ${error ? 'input-error' : ''}`}
        value={localValue}
        onChange={handleChange}
      />
      {error && (
        <span className="input-error-msg">
          amount cannot be empty
        </span>
      )}
    </div>
  );
}
