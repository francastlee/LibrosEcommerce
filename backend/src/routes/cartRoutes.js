import express from 'express';
import * as cartController from '../controllers/cartController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(verifyToken);

router.post('/', cartController.addToCart);

router.get('/', cartController.getCart);

router.get('/total', cartController.getTotal);

router.delete('/:bookId', cartController.removeFromCart);

router.delete('/', cartController.clearCart);

router.patch('/:bookId', cartController.updateQuantity);


export default router;
