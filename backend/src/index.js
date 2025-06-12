import express from 'express';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
