import * as cartRepository from '../repositories/cartRepository.js';
import { getBookById } from '../repositories/bookRepository.js';

export const addToCart = async (userId, bookId, quantity) => {
  if (!bookId || typeof bookId !== 'number') {
    throw { status: 400, message: 'Invalid book ID' };
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    throw { status: 400, message: 'Quantity must be a positive number' };
  }

  const book = await getBookById(bookId);
  if (!book) {
    throw { status: 404, message: 'Book not found' };
  }

  return await cartRepository.addToCart(userId, bookId, quantity);
};

export const getCart = async (userId) => {
  return await cartRepository.getCartItems(userId);
};

export const getCartTotal = async (userId) => {
  return await cartRepository.getCartTotal(userId);
};

export const removeFromCart = async (userId, bookId) => {
  const removed = await cartRepository.removeFromCart(userId, bookId);
  if (!removed) {
    throw { status: 404, message: 'Book not found in cart' };
  }
  return removed;
};

export const clearCart = async (userId) => {
  await cartRepository.clearCart(userId);
  return { message: 'Cart cleared' };
};

export const updateQuantity = async (userId, bookId, quantity) => {
  if (quantity < 1) {
    throw { status: 400, message: 'La cantidad debe ser mayor o igual a 1' };
  }

  const updated = await cartRepository.updateCartItemQuantity(userId, bookId, quantity);

  if (!updated) {
    throw { status: 404, message: 'El libro no se encuentra en el carrito' };
  }

  return updated;
};

