import { pool } from '../db' // Importa el pool de conexión a la base de datos

const MateriaPrimaController = {
    // Obtener todas las materias primas
    obtenerTodas: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM materia_prima'
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear una nueva materia prima
    crear: async (req, res, next) => {
        const { nombre, coste_total, cantidad_m3 } = req.body
        try {
            await pool.query(
                'INSERT INTO materia_prima (nombre, coste_total, cantidad_m3) VALUES (?, ?, ?)',
                [nombre, coste_total, cantidad_m3]
            )
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')
            res.status(201).json({
                message: 'Materia prima creada correctamente',
                id: rows[0].id
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener una materia prima por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT * FROM materia_prima WHERE id = ?',
                [id]
            )
            if (rows.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Materia prima no encontrada' })
            }
            res.status(200).json(rows[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar una materia prima
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const { nombre, coste_total, cantidad_m3 } = req.body
        try {
            await pool.query(
                'UPDATE materia_prima SET nombre = ?, coste_total = ?, cantidad_m3 = ? WHERE id = ?',
                [nombre, coste_total, cantidad_m3, id]
            )
            res.status(200).json({
                message: 'Materia prima actualizada correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Eliminar una materia prima
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM materia_prima WHERE id = ?', [id])
            res.status(200).json({
                message: 'Materia prima eliminada correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default MateriaPrimaController
