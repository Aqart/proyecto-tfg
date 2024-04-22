import { pool } from '../../db.js' // Importa el pool de conexión a la base de datos

const GastoEnergeticoMaquinaController = {
    // Obtener todos los gastos energéticos asociados a una máquina
    obtenerGastosPorMaquina: async (req, res, next) => {
        const { maquina_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT gasto_energetico.* FROM gasto_energetico JOIN gasto_energetico_maquina ON gasto_energetico.id = gasto_energetico_maquina.gasto_energetico_id WHERE gasto_energetico_maquina.maquina_id = ?',
                [maquina_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Obtener todas las máquinas asociadas a un gasto energetico
    obtenerMaquinasPorGasto: async (req, res, next) => {
        const { gasto_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT maquina.* FROM maquina JOIN gasto_energetico_maquina ON maquina.id = gasto_energetico_maquina.maquina_id WHERE gasto_energetico_maquina.gasto_energetico_id = ?',
                [gasto_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Asociar un gasto energetico a una máquina
    asociarGastoMaquina: async (req, res, next) => {
        const { gasto_id, maquina_id } = req.params
        try {
            await pool.query(
                'INSERT INTO gasto_energetico_maquina (gasto_energetico_id, maquina_id) VALUES (?, ?)',
                [gasto_id, maquina_id]
            )
            res.status(201).json({
                message: 'Gasto energético asociado a máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desasociar un gasto energetico de una máquina
    desasociarGastoMaquina: async (req, res, next) => {
        const { gasto_id, maquina_id } = req.params
        try {
            await pool.query(
                'DELETE FROM gasto_energetico_maquina WHERE gasto_energetico_id = ? AND maquina_id = ?',
                [gasto_id, maquina_id]
            )
            res.status(200).json({
                message: 'Gasto energético desasociado de máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default GastoEnergeticoMaquinaController
