import * as bookService from '../services/bookService.js';

export const listBooks = async (req, res) => {
  try {
    const books = await bookService.listBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving books' });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await bookService.getBook(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error retrieving book' });
  }
};

export const createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error creating book' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updated = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error updating book' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deleted = await bookService.deleteBook(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error deleting book' });
  }
};
