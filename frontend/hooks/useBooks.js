import { useEffect, useState } from 'react';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/books');
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al cargar los libros');
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.price >= priceRange[0] &&
        book.price <= priceRange[1] &&
        book.title.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [books, priceRange, searchName]);

  return {
    books,
    filteredBooks,
    loading,
    error,
    setSearchName,
    searchName,
    priceRange,
    setPriceRange,
    setError,
  };
}
