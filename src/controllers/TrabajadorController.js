import { pool } from '../db.js'

const TrabajadorController = {
    // Obtener todos los trabajadores
    obtenerTodos: async (req, res, next) => {
        try {
            const [rows, fields] = await pool.query(
                "SELECT tc.id, tc.numero_trabajador, CONCAT(t.nombre, ' ', t.apellido1, ' ', t.apellido2) AS nombre_completo, tc.precio, tc.id_maquina FROM trabajador_costes AS tc JOIN TRABAJADOR AS t ON tc.numero_trabajador = t.numero_trabajador"
            )

            res.status(200).json(rows)
        } catch (error) {
            next(error)
        }
    },

    // Crear un nuevo trabajador
    crear: async (req, res, next) => {
        const { numero_trabajador, precio, id_maquina } = req.body
        try {
            await pool.query(
                'INSERT INTO trabajador_costes (numero_trabajador, precio, id_maquina) VALUES (?, ?, ?)',
                [numero_trabajador, precio, id_maquina]
            )
            const [rows] = await pool.query('SELECT LAST_INSERT_ID() as id')
            res.status(201).json({
                message: 'Trabajador creado correctamente',
                numero_trabajador: rows[0].id,
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
                'SELECT * FROM trabajador_costes WHERE id = ?',
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

    // Obtener un trabajador por su número de trabajador
    obtenerPorNumTrabajador: async (req, res, next) => {
        const { numero_trabajador } = req.params
        try {
            const [rows, fields] = await pool.query(
                "SELECT tc.id, tc.numero_trabajador, CONCAT(t.nombre, ' ', t.apellido1, ' ', t.apellido2) AS nombre_completo, tc.precio, tc.id_maquina FROM trabajador_costes AS tc JOIN TRABAJADOR AS t ON tc.numero_trabajador = t.numero_trabajador WHERE t.numero_trabajador = ?",
                [numero_trabajador]
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
        const { numero_trabajador, precio, id_maquina } = req.body
        try {
            await pool.query(
                'UPDATE trabajador_costes SET numero_trabajador = ?, precio = ?, id_maquina = ? WHERE id = ?',
                [numero_trabajador, precio, id_maquina, id]
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
            await pool.query('DELETE FROM trabajador_costes WHERE id = ?', [id])
            res.status(200).json({
                message: 'Trabajador eliminado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },
}

export default TrabajadorController
