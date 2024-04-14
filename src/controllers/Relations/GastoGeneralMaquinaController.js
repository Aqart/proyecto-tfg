import { pool } from '../../db.js' // Importa el pool de conexión a la base de datos

const GastoGeneralMaquinaController = {
    // Obtener todos los gastos generales asociados a una máquina
    obtenerGastosPorMaquina: async (req, res, next) => {
        const { maquina_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT gasto_general.* FROM gasto_general JOIN gasto_general_maquina ON gasto_general.id = gasto_general_maquina.gasto_general_id WHERE gasto_general_maquina.maquina_id = ?',
                [maquina_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Obtener todas las máquinas asociadas a un gasto general
    obtenerMaquinasPorGasto: async (req, res, next) => {
        const { gasto_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT maquina.* FROM maquina JOIN gasto_general_maquina ON maquina.id = gasto_general_maquina.maquina_id WHERE gasto_general_maquina.gasto_general_id = ?',
                [gasto_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Asociar un gasto general a una máquina
    asociarGastoMaquina: async (req, res, next) => {
        const { gasto_id, maquina_id } = req.params
        try {
            await pool.query(
                'INSERT INTO gasto_general_maquina (gasto_general_id, maquina_id) VALUES (?, ?)',
                [gasto_id, maquina_id]
            )
            res.status(201).json({
                message: 'Gasto general asociado a máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desasociar un gasto general de una máquina
    desasociarGastoMaquina: async (req, res, next) => {
        const { gasto_id, maquina_id } = req.params
        try {
            await pool.query(
                'DELETE FROM gasto_general_maquina WHERE gasto_general_id = ? AND maquina_id = ?',
                [gasto_id, maquina_id]
            )
            res.status(200).json({
                message: 'Gasto general desasociado de máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default GastoGeneralMaquinaController
