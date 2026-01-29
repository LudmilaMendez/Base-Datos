import express, { Request, Response } from "express";
import path from "path";
import productsRouter from './routes/auth.route';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// __dirname representa la carpeta actual compilada
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/products', productsRouter);

//Usando Metodo GET
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Servidor Express con TypeScript funcionando." });
});

app.get("/saludo", (req: Request, res: Response) => {
    res.json({ message: "¡Hola, mundo! Esta es la Pag de Saludo" });
});

//Consumiendo el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});