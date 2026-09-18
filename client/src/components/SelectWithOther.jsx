import { useState } from 'react';
import Select from './Select';
import Input from './Input';

const OTHER = '__other__';

export default function SelectWithOther({
  label,
  value,
  onChange,
  options,
  allLabel = 'All',
  otherPlaceholder = 'Type it here...',
}) {
  const isCustomValue = value !== '' && !options.includes(value);
  const [mode, setMode] = useState(isCustomValue ? 'other' : 'select');

  const handleSelectChange = (e) => {
    const next = e.target.value;
    if (next === OTHER) {
      setMode('other');
      onChange('');
    } else {
      setMode('select');
      onChange(next);
    }
  };

  return (
    <div>
      <Select label={label} value={mode === 'other' ? OTHER : value} onChange={handleSelectChange}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
        <option value={OTHER}>Other (type manually)</option>
      </Select>
      {mode === 'other' && (
        <Input
          className="mt-2"
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={otherPlaceholder}
        />
      )}
    </div>
  );
}
