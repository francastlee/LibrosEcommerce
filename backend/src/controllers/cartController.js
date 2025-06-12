import * as cartService from '../services/cartService.js';

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity } = req.body;
    const item = await cartService.addToCart(userId, bookId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error adding to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await cartService.getCart(userId);
    res.status(200).json(items);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error getting cart' });
  }
};

export const getTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const total = await cartService.getCartTotal(userId);
    res.status(200).json({ total });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error getting total' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = parseInt(req.params.bookId);
    const removed = await cartService.removeFromCart(userId, bookId);
    res.status(200).json(removed);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error removing item' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await cartService.clearCart(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error clearing cart' });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = parseInt(req.params.bookId);
    const { operation } = req.body;

    const result = await cartService.updateItemQuantity(userId, bookId, operation);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error updating cart item' });
  }
};

