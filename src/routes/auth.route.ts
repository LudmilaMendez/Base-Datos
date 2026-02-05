import { Router } from 'express';
import { register, login } from '../controllers/auth.controller'; //!ROUTER SIEMPRE IMPORTA AL CONTROLADOR
import {
    registerValidator,
    loginValidator,   //!DEFINIDOS AMBOS EN AUTH.VALIDATOR.TS
} from '../validators/auth.validator';
//import rateLimit from 'express-rate-limit';

const router = Router();
//!  AUTHLIMITER SE USA PARA ACLARAR CUANTAS VECES PUEDO EJECUTAR UNA PETICION HTTP

router.post('/register', registerValidator, register);
router.post('/login',loginValidator, login);

export default router;