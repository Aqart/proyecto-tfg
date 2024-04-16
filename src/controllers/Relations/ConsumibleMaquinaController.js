import { pool } from '../../db.js' // Importa el pool de conexión a la base de datos

const ConsumibleMaquinaController = {
    // Obtener todos los consumibles asociados a una máquina
    obtenerConsumiblesPorMaquina: async (req, res, next) => {
        const { maquina_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT consumible.* FROM consumible JOIN consumible_maquina ON consumible.id = consumible_maquina.consumible_id WHERE consumible_maquina.maquina_id = ?',
                [maquina_id]
            )

            

            res.status(200).json(rows)
        } catch (error) {
            console.error(
                'Error al obtener los consumibles por máquina:',
                error
            )
            next(error)
        }
    },

    // Obtener todas las máquinas asociadas a un consumible
    obtenerMaquinasPorConsumible: async (req, res, next) => {
        const { consumible_id } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT maquina.* FROM maquina JOIN consumible_maquina ON maquina.id = consumible_maquina.maquina_id WHERE consumible_maquina.consumible_id = ?',
                [consumible_id]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Asociar un consumible a una máquina
    asociarConsumibleMaquina: async (req, res, next) => {
        const { consumible_id, maquina_id } = req.params
        try {
            await pool.query(
                'INSERT INTO consumible_maquina (consumible_id, maquina_id) VALUES (?, ?)',
                [consumible_id, maquina_id]
            )
            res.status(201).json({
                message: 'Consumible asociado a máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desasociar un consumible de una máquina
    desasociarConsumibleMaquina: async (req, res, next) => {
        const { consumible_id, maquina_id } = req.params
        try {
            await pool.query(
                'DELETE FROM consumible_maquina WHERE consumible_id = ? AND maquina_id = ?',
                [consumible_id, maquina_id]
            )
            res.status(200).json({
                message: 'Consumible desasociado de máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default ConsumibleMaquinaController
