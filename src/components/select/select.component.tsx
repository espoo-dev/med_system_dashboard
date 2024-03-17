import React, { useState, ChangeEvent } from 'react';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  options: SelectOption[] | null;
  onChange: (selectedValue: string) => void;
}

function SelectInput({ label, options, onChange }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(event.target.value);
    onChange(selectedValue);
  };

  return (
    <div>
      {label ? <label htmlFor="options">{label}:</label> : ''}
      <select id="options" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Selecione...</option>
        {options && options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
