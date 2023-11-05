import express from 'express'
import {getChat, getChats, createChat, updateChat} from '../controllers/chatControllers'
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createChat);
router.get('/', authMiddleware, getChats);
router.get('/:id',authMiddleware, getChat);
router.put('/:id', authMiddleware, updateChat);

export default router;