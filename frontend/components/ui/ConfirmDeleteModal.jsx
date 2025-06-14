'use client';

import PropTypes from 'prop-types';
import { CircleX } from 'lucide-react';

export default function ConfirmDeleteModal({ message, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white text-[#27233A] rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          onClick={onCancel}
          aria-label="Cerrar"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
        >
          <CircleX />
        </button>

        <h2 className="text-xl font-bold mb-4 text-[#DCC48E]">¿Estás seguro?</h2>
        <p className="mb-6">{message}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDeleteModal.propTypes = {
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
