import {Router} from 'express';
import {addProduct} from "../controllers/products";

const router = Router();

router.post('/add', addProduct)

export default router;
