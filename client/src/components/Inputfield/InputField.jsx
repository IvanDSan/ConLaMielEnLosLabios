import React from 'react';

export const InputField = ({
  label,
  type,
  name,
  value,
  handleChange,
  errors,
}) => {
  return (
    <label htmlFor={name}>
      {label} *
      <input
        type={type}
        name={name}
        placeholder={`Introduce tu ${label.toLowerCase()}`}
        required
        value={value}
        onChange={handleChange}
        style={
          errors.includes(name.toLowerCase()) ||
          (['password', 'confirmPassword'].includes(name) &&
            errors.includes('passwordMismatch'))
            ? { border: '1px solid red' }
            : {}
        }
      />
    </label>
  );
};
