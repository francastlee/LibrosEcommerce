'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext'; 
import CartItem from '../../../components/ui/CartItem';
import Alert from '../../../components/ui/Alert';
import QuantityModal from '../../../components/ui/modalQuantity';
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';

export default function CartPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalItem, setModalItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (!user?.token) return;

    fetchCart();
    fetchTotal();
  }, [user]);

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
  
  const fetchTotal = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/cart/total', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener el total');
      setTotal(Number(data.total) || 0); 
    } catch (err) {
      setError(err.message);
    }
  };


  const handleClearCart = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/cart', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al vaciar el carrito');
      }

      setItems([]);
      setTotal(0);
      setSuccess('Carrito vaciado correctamente');
    } catch (err) {
      setError(err.message);
    }
  };


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
          item.book_id === bookId ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.price } : item
        )
      );
      setSuccess('Cantidad actualizada correctamente');
      fetchTotal();
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmRemove = async () => {
    if (!itemToDelete) return;
    try {
      const res = await fetch(`http://localhost:8080/api/cart/${itemToDelete.book_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el libro del carrito');
      }

      setItems((prev) => prev.filter((item) => item.book_id !== itemToDelete.book_id));
      setSuccess('Libro eliminado del carrito');
      setItemToDelete(null);
      fetchTotal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#505168] text-white px-6 pb-28 pt-10 flex flex-col items-center relative">
      <Alert message={error} type="error" onClose={() => setError('')} />
      <Alert message={success} type="success" onClose={() => setSuccess('')} />

      <h1 className="text-6xl font-bold text-center text-[#DCC48E] mt-10" style={{ textShadow: '2px 2px 8px rgba(220, 196, 142, 0.7)' }}>
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
        <div className="w-[90%] md:w-[50%] lg:w-[35%] max-h-[600px] overflow-y-auto space-y-4 px-2 mt-20">
          {items.map((item) => (
            <CartItem
              key={item.book_id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={() => setItemToDelete(item)}
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

      {itemToDelete && (
        <ConfirmDeleteModal
          message={`¿Seguro que deseas eliminar el libro "${itemToDelete.title}" del carrito?`}
          onCancel={() => setItemToDelete(null)}
          onConfirm={confirmRemove}
        />
      )}

     {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#27233A] text-[#DCC48E] py-4 px-6 shadow-lg z-50 flex justify-center items-center space-x-10">
          <span className="text-xl font-bold">
            Total a pagar: ${Number(total).toFixed(2)}
          </span>
          <button
            onClick={handleClearCart}
            className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition"
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </section>
  );
}
