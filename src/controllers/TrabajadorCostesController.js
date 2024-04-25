import { pool } from '../db.js' // Importa el pool de conexión a la base de datos

const TrabajadorController = {
    // Obtener todos los trabajadores
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM trabajador')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo trabajador
    crear: async (req, res, next) => {
        const { nombre, apellido1, apellido2, precio, produccion } = req.body
        try {
            await pool.query(
                'INSERT INTO trabajador (nombre, apellido1, apellido2, precio, produccion) VALUES (?, ?, ?, ?, ?)',
                [nombre, apellido1, apellido2, precio, produccion]
            )
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')
            res.status(201).json({
                message: 'Trabajador creado correctamente',
                id: rows[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un trabajador por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM trabajador WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Trabajador no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un trabajador
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, apellido1, apellido2, precio, produccion } = req.body
        try {
            await pool.query(
                'UPDATE trabajador SET nombre = ?, apellido1 = ?, apellido2 = ?, precio = ?, produccion = ? WHERE id = ?',
                [nombre, apellido1, apellido2, precio, produccion, id]
            )
            res.status(200).json({
                message: 'Trabajador actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un trabajador
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM trabajador WHERE id = ?', [id])
            res.status(200).json({
                message: 'Trabajador eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default TrabajadorController
