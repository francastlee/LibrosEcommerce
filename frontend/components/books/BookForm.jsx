'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

export default function BookForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price || !form.image) return;
     onSubmit({
        ...form,
        price: Number(form.price)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 text-black">
        <h2 className="text-xl font-bold text-[#DCC48E]">{initialData.id ? 'Editar Libro' : 'Agregar Libro'}</h2>

        <input
          type="text"
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="URL de la imagen"
          value={form.image}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-[#505168] text-white rounded hover:bg-[#DCC48E] hover:text-[#27233A] cursor-pointer">
            {initialData.id ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
