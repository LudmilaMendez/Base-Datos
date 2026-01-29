import express, { Request, Response } from "express";
import path from "path";

import 'dotenv/config';
import authRoutes from './routes/auth.route'; 

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


app.get("/saludo", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Esta es la Pag de Saludo" });
});


//Consumiendo el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});