import {Router} from 'express';
import {getMessage, register, activateAccount} from "../controllers/users";

const router = Router();

router.get('/', getMessage)

router.post('/auth/register', register);

router.get('/auth/activate', activateAccount);

export default router;
