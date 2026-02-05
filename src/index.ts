import express, { Request, Response } from "express";
import path from "path";

import 'dotenv/config';
import { IUser } from './types/Iuser';
import authRoutes from './routes/auth.route';
import { authenticate, authorize } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 4000;


interface AuthRequest extends Request {
    user?: IUser;
}


// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// __dirname representa la carpeta actual compilada
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/auth', authRoutes); //!ESTO ES LO UNICO QUE AGREGAMOS PARA CONEXION A BD, AHORA HAY QUE IMPORTAR AUTHROUTES ARRIBA

//Usando Metodo GET
app.get("/public", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Esta es la Pag publica, cualquiera puede entrar." });
});

// Ruta protegida (requiere autenticación)
// Estos endpoints no son escalables, porque el usuario puede tener +1 rol y por ende mas permisos.
// Es una manera de didactica de ver como funcionan los middlewares de auth:

app.get('/protected', authenticate, (req: Request, res: Response) => { //?authenticate ES EL MIDDLEWARE que verifica que el token sea valido. Verifica el login
    const authReq = req as AuthRequest; // <--- Aquí ocurre la magia
    res.json({
        message: 'Acceso permitido',
        user: authReq.user, 
    });
});


// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => { //?authorize ES EL MIDDLEWARE que verifica que el rol sea admin y la ruta entonces sea privada
    const authReq = req as AuthRequest;
    res.json({
        message: 'Acceso de administrador permitido',
        user: authReq.user,
    });
});

app.get("/metrics", authenticate, authorize(['admin']), (req: Request, res: Response) => {
    res.json({ message: "¡Hola, Admin! Esta es la Pag de Metricas" });
});

app.get("/saludo", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Esta es la Pag de Saludo" });
});


//Consumiendo el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});