import express, { Request, Response } from "express";
import path from "path";

import 'dotenv/config';
import authRoutes from './routes/auth.route';
import { authenticate, authorize } from './middlewares/auth.middleware';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// __dirname representa la carpeta actual compilada
app.use(express.static(path.join(__dirname, '..', 'public')));



//Usando Metodo GET
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Servidor Express con TypeScript funcionando." });
});

app.use('/auth', authRoutes); //!ESTO ES LO UNICO QUE AGREGAMOS PARA CONEXION A BD, AHORA HAY QUE IMPORTAR AUTHROUTES ARRIBA

// Ruta protegida (requiere autenticación)
// Estos endpoints no son escalables, porque el usuario puede tener +1 rol y por ende mas permisos.
// Es una manera de didactica de ver como funcionan los middlewares de auth:

app.get('/protected', authenticate, (req, res) => { //?authenticate ES EL MIDDLEWARE que verifica que el token sea valido. Verifica el login
    res.json({
        message: 'Acceso permitido',
        user: req.user,
    });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get('/admin', authenticate, authorize(['admin']), (req, res) => { //?authorize ES EL MIDDLEWARE que verifica que el rol sea admin y la ruta entonces sea privada
    res.json({
        message: 'Acceso de administrador permitido',
        user: req.user,
    });
});

app.get("/saludo", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Esta es la Pag de Saludo" });
});


//Consumiendo el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});