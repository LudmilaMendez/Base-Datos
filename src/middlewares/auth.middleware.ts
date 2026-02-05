import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/auth';
import { IUser } from '../types/Iuser';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface UserPayload {
    id: number;
    username: string;
    role: 'user' | 'admin';
}

interface AuthRequest extends Request {
    user?: UserPayload;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // 1. Extraer el token del encabezado
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    // 2. Verificar el token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        
        // 3. Inyectar el usuario en la petición (Casting limpio)
        (req as AuthRequest).user = decoded as UserPayload;
        next();
    });
};

//! Middleware de autorización

export const authorize = (rolesPermitidos: Array<'user' | 'admin'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { user } = req as AuthRequest; // Sacamos al usuario del request

        // Verificamos si existe el usuario y si su rol está en la lista permitida
        if (!user || !rolesPermitidos.includes(user.role)) {
            return res.status(403).json({ 
                message: `Acceso denegado. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}` 
            });
        }

        next();
    };
};