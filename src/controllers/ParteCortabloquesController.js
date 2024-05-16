//SELECT * FROM `PARTE_CORTABLOQUES` ORDER BY `fecha_inicio`,`hora_inicio`,`fecha_fin`,`hora_fin`;
import { pool } from '../db.js'

const ParteCortabloques = {
    // Obtener todos los partes de cortabloques
    obtenerTodos: async (req, res, next) => {
        try {
            const [rowsParte, fieldsParte] = await pool.query(
                'SELECT * FROM PARTE_CORTABLOQUES ORDER BY fecha_inicio, hora_inicio, fecha_fin, hora_fin'
            )
            const [rowsProduccion, fieldsProduccion] = await pool.query(
                'SELECT * FROM PRODUCCION_MAQUINA ORDER BY id_parte, id'
            )

            rowsParte.forEach((parte) => {
                parte.bis == 1 ? (parte.bis = true) : (parte.bis = false)
                parte.retal === 1 ? (parte.retal = true) : (parte.retal = false)
                if (parte.retal === true) {
                    parte.numero_bloque = null
                }
                parte.produccionMaquina = []
                rowsProduccion.forEach((produccion) => {
                    if (produccion.id_parte === parte.id) {
                        parte.produccionMaquina.push(produccion)
                    }
                })
            })

            res.status(200).json(rowsParte)
        } catch (error) {
            next(error)
        }
    },

    // Crear un parte de cortabloques
    crear: async (req, res, next) => {
        const {
            fecha_inicio,
            hora_inicio,
            fecha_fin,
            hora_fin,
            id_maquina,
            id_trabajador,
        } = req.body
        try {
            await pool.query(
                'INSERT INTO PARTE_CORTABLOQUES (fecha_inicio, hora_inicio, fecha_fin, hora_fin, id_maquina, id_trabajador) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    fecha_inicio,
                    hora_inicio,
                    fecha_fin,
                    hora_fin,
                    id_maquina,
                    id_trabajador,
                ]
            )
            const [rowsParte] = await pool.query(
                'SELECT LAST_INSERT_ID() as id'
            )
            res.status(201).json({
                message: 'Parte de cortabloques creado correctamente',
                id: rowsParte[0].id,
            })
        } catch (error) {
            next(error)
        }
    },

    // Obtener un parte de cortabloques por su ID
    obtenerPorId: async (req, res, next) => {
        const { id } = req.params
        try {
            const [rowsParte, fieldsParte] = await pool.query(
                'SELECT * FROM PARTE_CORTABLOQUES WHERE id = ?',
                [id]
            )
            if (rowsParte.length === 0) {
                return res
                    .status(404)
                    .json({ message: 'Parte de cortabloques no encontrado' })
            }
            res.status(200).json(rowsParte[0])
        } catch (error) {
            next(error)
        }
    },

    // Actualizar un parte de cortabloques
    actualizar: async (req, res, next) => {
        const { id } = req.params
        const {
            fecha_inicio,
            hora_inicio,
            fecha_fin,
            hora_fin,
            id_maquina,
            id_trabajador,
        } = req.body
        try {
            await pool.query(
                'UPDATE PARTE_CORTABLOQUES SET fecha_inicio = ?, hora_inicio = ?, fecha_fin = ?, hora_fin = ?, id_maquina = ?, id_trabajador = ? WHERE id = ?',
                [
                    fecha_inicio,
                    hora_inicio,
                    fecha_fin,
                    hora_fin,
                    id_maquina,
                    id_trabajador,
                    id,
                ]
            )
            res.status(200).json({
                message: 'Parte de cortabloques actualizado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query('DELETE FROM PARTE_CORTABLOQUES WHERE id = ?', [
                id,
            ])
            res.status(200).json({
                message: 'Parte de cortabloques eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}
export default ParteCortabloques
