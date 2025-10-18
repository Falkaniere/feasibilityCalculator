import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export default function Input({ label, hint, error, ...rest }: Props) {
  return (
    <label className="field">
      <span className="label">{label}</span>
      <input className={`input ${error ? 'input-error' : ''}`} {...rest} />
      {hint && <small className="hint">{hint}</small>}
      {error && <small className="error">{error}</small>}
    </label>
  );
}
