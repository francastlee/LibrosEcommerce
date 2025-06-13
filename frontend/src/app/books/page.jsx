'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooks } from '../../../hooks/useBooks';
import { useAuth } from '../../../context/AuthContext';
import gsap from 'gsap';

import CardBook from '../../../components/books/CardBook';
import Alert from '../../../components/ui/Alert';
import ModalQuantity from '../../../components/books/modalQuantity';
import BookFilters from '../../../components/books/BookFilters';

const MIN = 0;
const MAX = 1000;
const BOOKS_PER_PAGE = 10;

export default function BooksPage() {
  const { user, authenticated } = useAuth();
  const router = useRouter();

  const {
    books,
    filteredBooks,
    loading,
    error,
    setError,
    searchName,
    setSearchName,
    priceRange,
    setPriceRange,
  } = useBooks();

  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const containerRef = useRef(null);

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  );

  const handleClickAddToCart = (book) => {
    if (!authenticated || !user) {
      router.push('/auth/login');
      return;
    }
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleConfirmQuantity = async (quantity) => {
    try {
      const res = await fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ bookId: selectedBook.id, quantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al agregar al carrito');
      setMessage('Libro agregado al carrito');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setShowModal(false);
      setSelectedBook(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#505168] px-6 py-10">
      <h1 className="text-6xl font-bold text-center text-[#DCC48E] mt-10" style={{ textShadow: '2px 2px 8px rgba(220, 196, 142, 0.7)' }}>
        Nuestros libros
      </h1>

      <Alert message={error} type="error" onClose={() => setError('')} />
      <Alert message={message} type="success" onClose={() => setMessage('')} />

      <div className="max-w-4xl mx-auto mt-10 mb-10 px-4">
        <BookFilters
          searchName={searchName}
          setSearchName={setSearchName}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          min={MIN}
          max={MAX}
        />
      </div>

      {loading ? (
        <p className="text-center mt-10 text-7xl text-[#DCC48E]">Cargando libros...</p>
      ) : (
        <>
          <div className="max-w-6xl mx-auto mt-20" ref={containerRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {paginatedBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <CardBook
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    image={book.image}
                    onAddToCart={() => handleClickAddToCart(book)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) }, (_, i) => (
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
        </>
      )}

      {showModal && selectedBook && (
        <ModalQuantity
          book={selectedBook}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmQuantity}
        />
      )}
    </section>
  );
}
