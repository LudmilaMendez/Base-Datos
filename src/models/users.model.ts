import pool from '../database/mysql';
import { RowDataPacket } from 'mysql2';
import { UserRole } from '../types/auth';

export interface User { //Esto lo definimos porque TS y MySQL no se llevan bien
    id: number;                        //?NO SE PASA NI ESTO
    username: string;
    email: string;
    password: string;
    role: UserRole; // user o admin            //?NI ESTO    
}
                                      //?GRACIAS AL OMIT EN CREATEUSER

export type UserRow = User & RowDataPacket; // Extiende User con RowDataPacket para compatibilidad con MySQL

export const findUser = async (
    email: string = '',
    username: string = ''
): Promise<User | null> => {
    const [rows] = await pool.query<UserRow[]>( //*SELECCIONA TODO LO RELACIONADO (toda la fila o row) CON EL USUARIO, USERNAME O EMAIL
        'SELECT u.*, r.name as role FROM users u LEFT JOIN user_roles ur ON u.id = ur.user_id LEFT JOIN roles r ON ur.role_id = r.id WHERE u.email = ? OR u.username = ? LIMIT 1',
        [email, username]
    );

    return rows.length ? rows[0] : null;
};

export const createUser = async ( 
    user: Omit<User, 'id' | 'role'>           //?NO SE PASA NI EL ID NI EL ROL
): Promise<number> => {
    const [userResult] = await pool.query(                                //SE PASA CUANTOS ? COMO VALORES HAY
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', //NO SE PASA EL ROL PORQUE POR DEFECTO ES USER Y LA PASSWORD NO ESTA ENCRIPTADA
        [user.username, user.email, user.password]
    );

    console.log('User result:', userResult);

    return (userResult as any).insertId;
};