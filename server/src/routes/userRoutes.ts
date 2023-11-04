import {Router} from 'express'
import {registerUser, loginUser, getUsers, getUser} from '../controllers/userControllers'
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', registerUser);

router.post('/login', loginUser)

router.get('/',authMiddleware, getUsers);

router.get('/me', authMiddleware, getUser);


export default router;

