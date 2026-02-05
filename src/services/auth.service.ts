import bcrypt from 'bcrypt';
import * as userModel from '../models/users.model'; 
import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types/auth';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no definido'); //POR SI NO LO TENEMOS EN EL .ENV
}

const secretKey: string = process.env.JWT_SECRET;

//! ACA SE HACE LA LOGICA PURA DE REGISTRO Y LOGIN

export const register = async (
    username: string,
    email: string,
    password: string
): Promise<number> => {
    const hashedPassword = await bcrypt.hash(password, 10); //*HASHEAMOS LA PASSWORD ANTES DE GUARDARLA

    const userId = await userModel.createUser({
        username,
        email,
        password: hashedPassword,
    });

    return userId;
};

export const login = async (
    email: string,
    password: string
): Promise<string> => {
    const invalidCredentialsError = new Error('Credenciales inválidas'); //!MENSAJE DE ERROR GENERICO

    const user = await userModel.findUser(email); //!BUSCAMOS EL USUARIO POR EMAIL EN LA BD
    if (!user) throw invalidCredentialsError; //SI NO EXISTE, ERROR

    const isValid = await bcrypt.compare(password, user.password); //!COMPARA LA PASSWORD INGRESADA CON LA HASHEADA EN LA BD
    if (!isValid) throw invalidCredentialsError;

    /**
     * Payload del token JWT
     * Contiene la información básica del usuario
     */
    const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        role: user.role as UserRole,
    };

    /**
     * Configuración del token JWT
     * expiresIn: tiempo de expiración
     * issuer: emisor del token
     */
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h',
        issuer: 'Backend',
    };

    /**
     * Generación del token JWT
     * Se firma el payload con el secreto y las opciones definidas
     */
    return jwt.sign(payload, secretKey, options); // PODEMOS VERLO EN JWT.IO
};