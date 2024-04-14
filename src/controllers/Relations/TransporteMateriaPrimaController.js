import { pool } from '../../db.js' // Importa el pool de conexión a la base de datos

const TransporteMateriaPrimaController = {
    // Obtener todas las materias primas asociadas a un transporte
    obtenerMateriasPrimasPorTransporte: async (req, res, next) => {
        const { transporte_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT materia_prima.* FROM materia_prima JOIN transporte_materia_prima ON materia_prima.id = transporte_materia_prima.materia_prima_id WHERE transporte_materia_prima.transporte_id = ?',
                [transporte_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Obtener todos los transportes asociados a una materia prima
    obtenerTransportesPorMateriaPrima: async (req, res, next) => {
        const { materia_prima_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT transporte.* FROM transporte JOIN transporte_materia_prima ON transporte.id = transporte_materia_prima.transporte_id WHERE transporte_materia_prima.materia_prima_id = ?',
                [materia_prima_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Asociar una materia prima a un transporte
    asociarMateriaPrimaTransporte: async (req, res, next) => {
        const { materia_prima_id, transporte_id } = req.params
        try {
            await pool.query(
                'INSERT INTO transporte_materia_prima (materia_prima_id, transporte_id) VALUES (?, ?)',
                [materia_prima_id, transporte_id]
            )
            res.status(201).json({
                message: 'Materia prima asociada a transporte correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desasociar una materia prima de un transporte
    desasociarMateriaPrimaTransporte: async (req, res, next) => {
        const { materia_prima_id, transporte_id } = req.params
        try {
            await pool.query(
                'DELETE FROM transporte_materia_prima WHERE materia_prima_id = ? AND transporte_id = ?',
                [materia_prima_id, transporte_id]
            )
            res.status(200).json({
                message:
                    'Materia prima desasociada de transporte correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default TransporteMateriaPrimaController
