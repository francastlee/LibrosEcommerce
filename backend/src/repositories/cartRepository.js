import pool from '../config/db.js';

export const addToCart = async (userId, bookId, quantity) => {
  const result = await pool.query(
    `
    INSERT INTO cart_items (user_id, book_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, book_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    RETURNING *
    `,
    [userId, bookId, quantity]
  );
  return result.rows[0];
};

export const getCartItems = async (userId) => {
  const result = await pool.query(
    `
    SELECT ci.id, b.id as book_id, b.title, b.price, ci.quantity, b.image, (b.price * ci.quantity) AS subtotal
    FROM cart_items ci
    JOIN books b ON ci.book_id = b.id
    WHERE ci.user_id = $1
    `,
    [userId]
  );
  return result.rows;
};

export const removeFromCart = async (userId, bookId) => {
  const result = await pool.query(
    'DELETE FROM cart_items WHERE user_id = $1 AND book_id = $2 RETURNING *',
    [userId, bookId]
  );
  return result.rows[0]; 
};


export const clearCart = async (userId) => {
  await pool.query(`DELETE FROM cart_items WHERE user_id = $1`, [userId]);
};

export const getCartTotal = async (userId) => {
  const result = await pool.query(
    `
    SELECT SUM(b.price * ci.quantity) AS total
    FROM cart_items ci
    JOIN books b ON ci.book_id = b.id
    WHERE ci.user_id = $1
    `,
    [userId]
  );
  return result.rows[0]?.total || 0;
};

export async function getCartItem(userId, bookId) {
  const result = await db.query(
    'SELECT * FROM cart WHERE user_id = $1 AND book_id = $2',
    [userId, bookId]
  );
  return result.rows[0] || null;
}

export const updateCartItemQuantity = async (userId, bookId, quantity) => {
  const result = await pool.query(
    `
    UPDATE cart_items
    SET quantity = $1
    WHERE user_id = $2 AND book_id = $3
    RETURNING *
    `,
    [quantity, userId, bookId]
  );

  return result.rows[0];
};