'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CircleX } from 'lucide-react';

export default function modalQuantity({
  title = '',
  label = '¿Cuántas unidades?',
  defaultQuantity = 1,
  confirmText = 'Agregar',
  onConfirm,
  onClose,
}) {
  const [quantity, setQuantity] = useState(defaultQuantity);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value > 0) setQuantity(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm text-[#27233A] relative">

        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg font-bold cursor-pointer"
        >
          <CircleX />
        </button>

        <h2 className="text-lg font-bold mb-4">
          {label} <span className="text-[#DCC48E]">{title}</span>
        </h2>

        <input
          type="number"
          value={quantity}
          min={1}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-center text-[#505168] mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 cursor-pointer rounded hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onConfirm(quantity)}
            className="px-4 py-2 bg-[#505168] cursor-pointer text-white rounded hover:bg-[#DCC48E] hover:text-[#27233A] transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

modalQuantity.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  defaultQuantity: PropTypes.number,
  confirmText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
