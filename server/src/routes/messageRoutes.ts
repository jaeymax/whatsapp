import express from 'express';
import { createMessage, getMessages } from '../controllers/messageControllers';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getMessages);
router.post('/',authMiddleware, createMessage);

export default router;