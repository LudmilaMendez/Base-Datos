import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;

//!LOS MIDDLEWARES SIRVEN PARA CORTAR (o no) LA EJECUCION DE UNA RUTA
//Un middleware en Express es una función que se ejecuta antes de que una ruta final responda al cliente.
//Puede hacer tareas como:

// Verificar que haya un token válido (autenticación)
// Verificar que el usuario tenga un rol permitido (autorización)
// Validar datos del cuerpo de la petición
// Registrar logs de uso
// Manipular la respuesta o continuar hacia el siguiente middleware


//! Middleware de autenticación
//  VERIFICA QUE EL TOKEN SEA VALIDO Y LO ALMACENA EN REQ.USER
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction //LA FUNCION QUE VA A CONTENER AL MIDDLEWARE PARA QUE SIGA LA EJECUCION
) => {
    const token = req.headers.authorization?.split(' ')[1];  //! Bearer <token> 
    //! BEARER ES LA PALABRA RESERVADA PARA VALIDAR EL TOKEN (es estandar, para dar contexto de lo q estamos haciendo)

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => { //VERIFICACION DEL TOKEN
        if (err) {
            return res.status(403).json({ message: 'Invalid token or expired' });
        }
        req.user = decoded as JwtPayload;  
        next();
    });
};

//! Middleware de autorización

export const authorize = (roles: Array<'user' | 'admin'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};