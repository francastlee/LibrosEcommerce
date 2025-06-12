import express from 'express';
import * as bookController from '../controllers/bookController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import verifyRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', bookController.listBooks);
router.get('/:id', bookController.getBook);

router.post('/', verifyToken, verifyRole(['admin']), bookController.createBook);
router.put('/:id', verifyToken, verifyRole(['admin']), bookController.updateBook);
router.delete('/:id', verifyToken, verifyRole(['admin']), bookController.deleteBook);

export default router;
