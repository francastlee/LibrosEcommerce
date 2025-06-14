'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import PropTypes from 'prop-types';

export default function InputPassword({ value, onChange, name = 'password', id = 'password', label = 'Contraseña' }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-6 relative">
      <label htmlFor={id} className="block mb-1 font-medium text-white">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required
        autoComplete="current-password"
        className="w-full border rounded px-3 py-2 text-[#DCC48E] pr-10 bg-[#27233A]"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-[#DCC48E] hover:text-white cursor-pointer"
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

InputPassword.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};
