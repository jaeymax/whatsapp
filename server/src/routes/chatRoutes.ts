import express from 'express'
import {getChat, getChats, createChat} from '../controllers/chatControllers'
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createChat);
router.get('/', authMiddleware, getChats);
router.get('/:id',authMiddleware, getChat);

export default router;