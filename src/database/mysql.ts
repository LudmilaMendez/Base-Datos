import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de conexiones usando variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
    queueLimit: 0,
    port: 3307,
});

pool.getConnection()
    .then(connection => {
        console.log("✅ ¡CONEXIÓN EXITOSA A MYSQL!");
        connection.release(); // Siempre libera la conexión
    })
    .catch(err => {
        console.error("❌ ERROR DE CONEXIÓN A MYSQL:", err.message);
    });

export default pool;

console.log("Intentando conectar con el usuario:", process.env.DB_USER);
console.log("Base de datos:", process.env.DB_NAME);