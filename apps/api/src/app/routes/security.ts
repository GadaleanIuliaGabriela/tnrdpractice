import {Router} from 'express';
import {register, activateAccount, login} from "../controllers/security";

const router = Router();

router.post('/auth/register', register);

router.post('/auth/login', login);

router.get('/auth/activate', activateAccount);

export default router;
