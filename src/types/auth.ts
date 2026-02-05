// src/types/auth.ts
export interface JwtPayload { //jwsonwebtoken personalizado
    id: number; //ESTO ES LO QUE VA A PERMITIR VALIDAR TODO LO DEMAS
    username: string;
    role: UserRole;
}

export type UserRole = 'user' | 'admin';

export interface JwtPayload {
    id: number;
    username: string;
    role: UserRole;
}
