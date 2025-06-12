import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository.js';

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isPasswordValid = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);


export const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const error = new Error('Todos los campos son obligatorios');
    error.status = 400;
    throw error;
  }

  if (!isEmailValid(email)) {
    const error = new Error('Debes ingresar un correo electrónico válido');
    error.status = 400;
    throw error;
  }

  if (!isPasswordValid(password)) {
    const error = new Error('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números');
    error.status = 400;
    throw error;
  }

  const existing = await userRepository.getUserByEmail(email);
  if (existing) {
    const error = new Error('Ya existe un usuario con ese correo');
    error.status = 409;
    throw error;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ name, email, password: hashed });

  await userRepository.assignRoleToUser(user.id, 'user');

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Correo y contraseña son obligatorios');
    error.status = 400;
    throw error;
  }

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  const roles = await userRepository.getUserRoles(user.id);

  const token = jwt.sign({ id: user.id, roles }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      roles,
    },
  };
};
