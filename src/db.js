import mysql from 'mysql2/promise' // Importamos el módulo mysql2/promise para interactuar con MySQL
import dotenv from 'dotenv' // Importamos el módulo dotenv para cargar las variables de entorno

dotenv.config() // Cargamos las variables de entorno desde el archivo .env

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig)

// Exportar el pool de conexiones
export { pool }
