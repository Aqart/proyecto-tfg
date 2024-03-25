import { pool } from '../db' // Importamos el pool de conexión a la base de datos

const ConsumibleController = {
    // Obtener todos los consumibles
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM consumible')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo consumible
    crear: async (req, res, next) => {
        const { nombre, precio } = req.body
        try {
            await pool.query(
                'INSERT INTO consumible (nombre, precio) VALUES (?, ?)',
                [nombre, precio]
            )
            res.status(201).json({
                message: 'Consumible creado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un consumible por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM consumible WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Consumible no encontrado' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un consumible
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, precio } = req.body
        try {
            await pool.query(
                'UPDATE consumible SET nombre = ?, precio = ? WHERE id = ?',
                [nombre, precio, id]
            )
            res.status(200).json({
                message: 'Consumible actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar un consumible
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM consumible WHERE id = ?', [id])
            res.status(200).json({
                message: 'Consumible eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default ConsumibleController
