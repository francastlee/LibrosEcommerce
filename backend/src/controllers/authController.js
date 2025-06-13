import * as userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const newUser = await userService.register(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Decoded token:', req.user);

    const result = await userService.login(req.body);
    
    res.status(200).json(result);
  } catch (err) {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ error: err.message });
  }
};
