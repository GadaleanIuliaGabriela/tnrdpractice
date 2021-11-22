import {Router} from 'express';
import {getMessage, register, activateAccount, login} from "../controllers/users";

const router = Router();

router.get('/', getMessage)

router.post('/auth/register', register);

router.post('/auth/login', login);

router.get('/auth/activate', activateAccount);

export default router;
