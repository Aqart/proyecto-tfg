import { pool } from '../../db.js'

const TrabajadorMaquinaController = {
    // Asociar un trabajador a una máquina
    asociarTrabajadorMaquina: async (req, res, next) => {
        const { trabajadorId, maquinaId } = req.params

        try {
            // Verificar si el trabajador y la máquina existen
            const [trabajador] = await pool.query(
                'SELECT * FROM trabajador WHERE id = ?',
                [trabajadorId]
            )
            const [maquina] = await pool.query(
                'SELECT * FROM maquina WHERE id = ?',
                [maquinaId]
            )

            if (trabajador.length === 0 || maquina.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Trabajador o máquina no encontrados' })
            }

            // Asociar el trabajador a la máquina
            await pool.query(
                'INSERT INTO trabajador_maquina (trabajador_id, maquina_id) VALUES (?, ?)',
                [trabajadorId, maquinaId]
            )

            res.status(200).json({
                message: 'Trabajador asociado a máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Desasociar un trabajador de una máquina
    desasociarTrabajadorMaquina: async (req, res, next) => {
        const { trabajadorId, maquinaId } = req.params

        try {
            // Verificar si el trabajador y la máquina están asociados
            const [result] = await pool.query(
                'SELECT * FROM trabajador_maquina WHERE trabajador_id = ? AND maquina_id = ?',
                [trabajadorId, maquinaId]
            )

            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Trabajador no está asociado a la máquina',
                })
            }

            // Desasociar el trabajador de la máquina
            await pool.query(
                'DELETE FROM trabajador_maquina WHERE trabajador_id = ? AND maquina_id = ?',
                [trabajadorId, maquinaId]
            )

            res.status(200).json({
                message: 'Trabajador desasociado de máquina correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
    obtenerMaquinasPorTrabajador: async (req, res, next) => {
        const { trabajadorId } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT maquina.* FROM maquina JOIN trabajador_maquina ON maquina.id = trabajador_maquina.maquina_id WHERE trabajador_maquina.trabajador_id = ?',
                [trabajadorId]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },
    obtenerTrabajadoresPorMaquina: async (req, res, next) => {
        const { maquinaId } = req.params
        try {
            const [rows, fields] = await pool.query(
                'SELECT trabajador.* FROM trabajador JOIN trabajador_maquina ON trabajador.id = trabajador_maquina.trabajador_id WHERE trabajador_maquina.maquina_id = ?',
                [maquinaId]
            )
            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },
}

export default TrabajadorMaquinaController
