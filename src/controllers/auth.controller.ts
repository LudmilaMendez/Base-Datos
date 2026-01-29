import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { validationResult } from 'express-validator';


//!  ACA VAMOS A CONTROLAR AL SERVICE Y AL MODEL
//!  HACEMOS LAS CAPTURAS DE ERRORES Y LAS VALIDACIONES 

export const register = async (req: Request, res: Response) => {
    try {
        // Verificar errores de validación  //?PRIMERA CAPA DE SEGURIDAD
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        await authService.register(username, email, password);

        return res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'El usuario o email ya existe' }); //PRIMER ERROR
        }
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar el usuario' }); //SEGUNDO ERROR
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;    //!COSAS QUE NECESITO PARA LOGUEARME
        const token = await authService.login(email, password);

        return res.json({ token });
    } catch (error: any) {
        console.error('Error en login:', error);;
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ error: error.message }); //osea "Credenciales Invalidas"
        }
        return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};