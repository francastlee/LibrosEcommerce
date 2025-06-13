'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext'; 
import CartItem from '../../../components/ui/CartItem';
import Alert from '../../../components/ui/Alert';
import QuantityModal from '../../../components/ui/modalQuantity';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    if (!user?.token) return;

    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/cart', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al cargar el carrito');
        setItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCart();
  }, [user]);

  const handleQuantityChange = async (bookId, newQuantity) => {
    try {
      const res = await fetch(`http://localhost:8080/api/cart/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la cantidad');
      }

      setItems((prev) =>
        prev.map((item) =>
          item.book_id === bookId ? { ...item, quantity: newQuantity } : item
        )
      );
      setSuccess('Cantidad actualizada correctamente');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemove = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/cart/${bookId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el libro del carrito');
      }

      setItems((prev) => prev.filter((item) => item.book_id !== bookId));
      setSuccess('Libro eliminado del carrito');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#505168] text-white px-6 py-10 flex flex-col items-center">
      <Alert message={error} type="error" onClose={() => setError('')} />
      <Alert message={success} type="success" onClose={() => setSuccess('')} />

      <h1 className="text-4xl font-bold text-center mb-10 text-[#DCC48E]">
        Carrito de compras
      </h1>

      {items.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg mb-4">Tu carrito está vacío.</p>
          <button
            onClick={() => router.push('/books')}
            className="px-6 py-3 bg-[#DCC48E] text-[#27233A] font-bold rounded hover:bg-[#c9b576] transition cursor-pointer"
          >
            Ver libros disponibles
          </button>
        </div>
      ) : (
        <div className="w-[90%] md:w-[50%] lg:w-[35%] max-h-[600px] overflow-y-auto space-y-4 px-2">
          {items.map((item) => (
            <CartItem
              key={item.book_id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={() => handleRemove(item.book_id)}
              onEdit={() => setModalItem(item)}
            />
          ))}
        </div>
      )}

      {modalItem && (
        <QuantityModal
          title={modalItem.title}
          defaultQuantity={modalItem.quantity}
          confirmText="Actualizar"
          onConfirm={(newQty) => {
            handleQuantityChange(modalItem.book_id, newQty);
            setModalItem(null);
          }}
          onClose={() => setModalItem(null)}
        />
      )}
    </section>
  );
}
