import {Router} from 'express';
import {addProduct, getUserProducts} from "../controllers/products";

const router = Router();

router.post('/add', addProduct);

router.post('/my-products', getUserProducts);

export default router;
