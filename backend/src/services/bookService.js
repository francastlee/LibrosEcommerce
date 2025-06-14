import * as bookRepository from '../repositories/bookRepository.js';

const isNonEmpty = (value) => typeof value === 'string' && value.trim() !== '';
const isPositiveNumber = (value) => typeof value === 'number' && value > 0;

export const listBooks = async () => {
  return await bookRepository.getAllBooks();
};

export const getBook = async (id) => {
  const book = await bookRepository.getBookById(id);
  if (!book) {
    const error = new Error('Book not found');
    error.status = 404;
    throw error;
  }
  return book;
};

export const createBook = async ({ title, description, price, image, category, author }) => {
  if (!isNonEmpty(title)) {
    throw { status: 400, message: 'Title is required' };
  }

  if (!isPositiveNumber(price)) {
    throw { status: 400, message: 'Price must be a positive number' };
  }

  return await bookRepository.createBook({
    title,
    description,
    price,
    image,
    category,
    author,
  });
};

export const updateBook = async (id, data) => {
  const book = await bookRepository.getBookById(id);
  if (!book) {
    throw { status: 404, message: 'Book not found' };
  }

  return await bookRepository.updateBook(id, data);
};

export const deleteBook = async (id) => {
  const deleted = await bookRepository.deleteBook(id);
  if (!deleted) {
    throw { status: 404, message: 'Book not found' };
  }
  return deleted;
};
