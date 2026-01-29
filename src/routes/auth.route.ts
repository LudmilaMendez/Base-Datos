import { Router } from 'express';
import {
    showDashboard,
    createProduct,
} from '../controllers/auth.controller';

const router = Router();

router.get('/', showDashboard);
router.post('/create', createProduct);

export default router;