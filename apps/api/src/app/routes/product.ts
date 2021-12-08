import {Router} from 'express';
import {addProduct, getUserProducts} from "../controllers/products";

const router = Router();

router.post('/products', addProduct);

router.get('/users/:id/products', getUserProducts);

export default router;
