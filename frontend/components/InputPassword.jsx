'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function InputPassword({ value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-6 relative">
      <label htmlFor="password" className="block mb-1 font-medium text-white">
        Contraseña
      </label>
      <input
        id="password"
        type={show ? 'text' : 'password'}
        name="password"
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded px-3 py-2 text-[#DCC48E] pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-[#DCC48E] hover:text-white"
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}
