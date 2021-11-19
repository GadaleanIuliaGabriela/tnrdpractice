import {Router} from 'express';
import {getMessage, register} from "../controllers/users";

const router = Router();

router.get('/', getMessage)

router.post('/auth/register', register);

export default router;
