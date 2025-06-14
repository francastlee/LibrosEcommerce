'use client';

import { Pencil, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

export default function CartItem({ item, onRemove, onEdit }) {
  return (
    <div className="flex items-center gap-4 bg-[#27233A] p-4 rounded-xl shadow-md">
      <img
        src={item.image}
        alt={`Portada del libro ${item.title}`}
        className="w-20 h-28 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#DCC48E]">{item.title}</h3>
        <p className="text-sm text-gray-300">Precio unitario: ${item.price}</p>
        <p className="text-sm text-gray-300">Subtotal: ${item.subtotal}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-gray-300">Cantidad: {item.quantity}</span>
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Editar cantidad de ${item.title}`}
            className="text-[#DCC48E] hover:text-white cursor-pointer"
          >
            <Pencil size={16} />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Eliminar ${item.title} del carrito`}
        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm font-semibold cursor-pointer me-6"
      >
        <Trash2 />
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    book_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    subtotal: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
