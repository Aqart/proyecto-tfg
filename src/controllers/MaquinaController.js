import { pool } from '../db' // Importamos el pool de conexión a la base de datos

const MaquinaController = {
    // Obtener todas las máquinas
    obtenerTodas: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query('SELECT * FROM maquina')
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear una nueva máquina
    crear: async (req, res, next) => {
        const { nombre, produccion_m2, energia_consumida } = req.body
        try {
            await pool.query(
                'INSERT INTO maquina (nombre, produccion_m2, energia_consumida) VALUES (?, ?, ?)',
                [nombre, produccion_m2, energia_consumida]
            )
            res.status(201).json({
                message: 'Máquina creada correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener una máquina por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM maquina WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Máquina no encontrada' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar una máquina
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, produccion_m2, energia_consumida } = req.body
        try {
            await pool.query(
                'UPDATE maquina SET nombre = ?, produccion_m2 = ?, energia_consumida = ? WHERE id = ?',
                [nombre, produccion_m2, energia_consumida, id]
            )
            res.status(200).json({
                message: 'Máquina actualizada correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar una máquina
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM maquina WHERE id = ?', [id])
            res.status(200).json({ message: 'Máquina eliminada correctamente' })
        } catch (error) {
            next(error)
        }
    },
}

export default MaquinaController