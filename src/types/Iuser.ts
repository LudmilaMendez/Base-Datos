import { UserRole } from './auth'

export interface IUser { //Esto lo definimos porque TS y MySQL no se llevan bien
    id: number;                        //?NO SE PASA NI ESTO
    username: string;
    email: string;
    password: string;
    role: UserRole; // user o admin            //?NI ESTO    
}
                                      //?GRACIAS AL OMIT EN CREATEUSER
