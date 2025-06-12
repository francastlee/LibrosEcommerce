import pool from '../config/db.js';

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const createUser = async ({ name, email, password }) => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password]
  );
  return result.rows[0];
};

const assignRoleToUser = async (userId, roleName) => {
  const roleResult = await pool.query('SELECT id FROM roles WHERE name = $1', [roleName]);
  const roleId = roleResult.rows[0]?.id;
  if (!roleId) throw new Error('Rol no encontrado');

  await pool.query(
    'INSERT INTO user_role (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
    [userId, roleId]
  );
};

const getUserRoles = async (userId) => {
  const result = await pool.query(
    `SELECT r.name FROM user_role ur
     JOIN roles r ON ur.role_id = r.id
     WHERE ur.user_id = $1`,
    [userId]
  );
  return result.rows.map(r => r.name);
};

export {
  getUserByEmail,
  createUser,
  assignRoleToUser,
  getUserRoles
};
