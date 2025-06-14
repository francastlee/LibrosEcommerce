'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Alert from '../../../components/ui/Alert';
import BookForm from '../../../components/books/BookForm';
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';
import gsap from 'gsap';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState({});
  const [bookToDelete, setBookToDelete] = useState(null);
  const containerRef = useRef(null);

  const BOOKS_PER_PAGE = 8;

  useEffect(() => {
    if (user === null) return;
    if (!user?.token || !user?.roles?.includes('admin')) {
      router.push('/books');
      return;
    }
    fetchBooks();
  }, [user]);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/books', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cargar libros');
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const paginatedBooks = books.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const rows = containerRef.current.querySelectorAll('tbody tr');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
    );
  }, [currentPage, books]);

  const handleFormSubmit = async (data) => {
    try {
      const isEdit = !!editingBook?.id;
      const method = isEdit ? 'PUT' : 'POST';
      const endpoint = isEdit
        ? `http://localhost:8080/api/books/${editingBook.id}`
        : 'http://localhost:8080/api/books';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al guardar el libro');

      setShowForm(false);
      setEditingBook({});
      setSuccess(`Libro ${isEdit ? 'actualizado' : 'agregado'} con éxito`);
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${bookToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al eliminar el libro');

      setSuccess('Libro eliminado correctamente');
      setBookToDelete(null);
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-screen bg-[#505168] text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl">
        <Alert message={error} type="error" onClose={() => setError('')} />
        <Alert message={success} type="success" onClose={() => setSuccess('')} />

        <h1 className="text-6xl font-bold text-center text-[#DCC48E] mt-10" style={{ textShadow: '2px 2px 8px rgba(220, 196, 142, 0.7)' }}>
          Panel de Administración - Libros
        </h1>

        <div className="flex justify-end mb-4 mt-10">
          <button
            onClick={() => {
              setEditingBook({});
              setShowForm(true);
            }}
            className="bg-[#DCC48E] text-[#27233A] font-bold px-4 py-2 rounded hover:bg-[#c9b576] cursor-pointer"
          >
            + Agregar libro
          </button>
        </div>

        <div className="w-full overflow-x-auto bg-[#DCC48E] shadow-md rounded-lg p-4 overflow-y-hidden" ref={containerRef}>
          <table className="min-w-full text-sm text-left text-white bg-[#27233A]">
            <thead className="text-xs uppercase bg-[#505168] text-[#DCC48E]">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Autor</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((book) => (
                <tr key={book.id} className="border-b hover:bg-[#505168] transition">
                  <td className="px-4 py-2">{book.id}</td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">${book.price}</td>
                  <td className="px-4 py-2">
                    <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                        onClick={() => {
                          setEditingBook(book);
                          setShowForm(true);
                        }}
                      >
                        Editar
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                        onClick={() => setBookToDelete(book)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(books.length / BOOKS_PER_PAGE) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded transition font-semibold cursor-pointer ${
                currentPage === i + 1
                  ? 'bg-[#DCC48E] text-black'
                  : 'bg-white text-[#505168] hover:bg-[#DCC48E] hover:text-black'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {showForm && (
          <BookForm
            initialData={editingBook || {}}
            onCancel={() => {
              setShowForm(false);
              setEditingBook({});
            }}
            onSubmit={handleFormSubmit}
          />
        )}

        {bookToDelete && (
          <ConfirmDeleteModal
            message={`¿Seguro que deseas eliminar el libro "${bookToDelete.title}"?`}
            onCancel={() => setBookToDelete(null)}
            onConfirm={handleDeleteConfirmed}
          />
        )}
      </div>
    </section>
  );
}
