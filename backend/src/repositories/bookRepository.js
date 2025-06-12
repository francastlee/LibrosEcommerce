import pool from '../config/db.js';

export const getAllBooks = async () => {
  const result = await pool.query(
    `SELECT * FROM books ORDER BY created_at DESC`
  );
  return result.rows;
};

export const getBookById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM books WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

export const createBook = async ({ title, description, price, image, category, author }) => {
  const result = await pool.query(
    `INSERT INTO books (title, description, price, image, category, author)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, price, image, category, author]
  );
  return result.rows[0];
};

export const updateBook = async (id, { title, description, price, image, category, author }) => {
  const result = await pool.query(
    `UPDATE books
     SET title = $1, description = $2, price = $3, image = $4, category = $5, author = $6
     WHERE id = $7
     RETURNING *`,
    [title, description, price, image, category, author, id]
  );
  return result.rows[0];
};

export const deleteBook = async (id) => {
  const result = await pool.query(
    `DELETE FROM books WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
};
