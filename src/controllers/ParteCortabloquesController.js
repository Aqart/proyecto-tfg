//SELECT * FROM `PARTE_CORTABLOQUES` ORDER BY `fecha_inicio`,`hora_inicio`,`fecha_fin`,`hora_fin`;
const pool = require('../db.js').pool

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
                parte.fecha_inicio = new Date(
                    parte.fecha_inicio.getTime() -
                        parte.fecha_inicio.getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .split('T')[0]
                parte.fecha_fin = new Date(
                    parte.fecha_fin.getTime() -
                        parte.fecha_fin.getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .split('T')[0]

                parte.bis === 1 ? (parte.bis = true) : (parte.bis = false)
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
        console.log(req.body)
        const {
            fecha_inicio,
            hora_inicio,
            fecha_fin,
            hora_fin,
            observaciones,
            numero_trabajador,
            numero_bloque,
            bis,
            retal,
            produccionMaquina,
        } = req.body
        try {
            await pool.query(
                'INSERT INTO PARTE_CORTABLOQUES (fecha_inicio, hora_inicio, fecha_fin, hora_fin, observaciones, numero_trabajador, numero_bloque, bis, retal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    fecha_inicio,
                    hora_inicio,
                    fecha_fin,
                    hora_fin,
                    observaciones,
                    numero_trabajador,
                    numero_bloque,
                    bis,
                    retal,
                ]
            )
            const [rowsParte] = await pool.query(
                'SELECT LAST_INSERT_ID() as id'
            )

            produccionMaquina.forEach(async (produccion) => {
                await pool.query(
                    'INSERT INTO PRODUCCION_MAQUINA (id_parte, largo, ancho, grosor, cantidad) VALUES (?, ?, ?, ?, ?)',
                    [
                        rowsParte[0].id,
                        produccion.largo,
                        produccion.ancho,
                        produccion.grosor,
                        produccion.numeroPiezas,
                    ]
                )
            })
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

    actualizar: async (req, res, next) => {
        const { id } = req.params
        const {
            bis,
            fecha_fin,
            fecha_inicio,
            hora_fin,
            hora_inicio,
            numero_bloque,
            numero_trabajador,
            observaciones,
            retal,
            produccionMaquina,
        } = req.body

        let rowsProduccionUpdate = [] // Declarar aquí

        try {
            await pool.query(
                'UPDATE PARTE_CORTABLOQUES SET bis= ?, fecha_fin = ?,  fecha_inicio = ?, hora_fin = ?, hora_inicio = ?,  numero_bloque = ?, numero_trabajador = ?, observaciones = ?, retal = ? WHERE id = ?',
                [
                    bis,
                    fecha_fin,
                    fecha_inicio,
                    hora_fin,
                    hora_inicio,
                    numero_bloque,
                    numero_trabajador,
                    observaciones,
                    retal,
                    id,
                ]
            )

            for (const produccion of produccionMaquina) {
                const [rowsProduccion, fieldsProduccion] = await pool.query(
                    'SELECT * FROM PRODUCCION_MAQUINA WHERE id_parte = ?',
                    [id]
                )

                if (rowsProduccion.length > produccionMaquina.length) {
                    for (
                        let i = produccionMaquina.length;
                        i < rowsProduccion.length;
                        i++
                    ) {
                        console.log('Eliminando', rowsProduccion[i].id)
                        await pool.query(
                            'DELETE FROM PRODUCCION_MAQUINA WHERE id = ?',
                            [rowsProduccion[i].id]
                        )
                    }
                }

                if (produccion.id === null || produccion.id === undefined) {
                    await pool.query(
                        'INSERT INTO PRODUCCION_MAQUINA (id_parte, largo, ancho, grosor, cantidad) VALUES (?, ?, ?, ?, ?)',
                        [
                            id,
                            produccion.largo,
                            produccion.ancho,
                            produccion.grosor,
                            produccion.cantidad,
                        ]
                    )
                }

                const [rows, fieldsProduccionUpdate] = await pool.query(
                    'UPDATE PRODUCCION_MAQUINA SET largo = ?, ancho = ?, grosor = ?, cantidad = ? WHERE id = ?',
                    [
                        produccion.largo,
                        produccion.ancho,
                        produccion.grosor,
                        produccion.cantidad,
                        produccion.id,
                    ]
                )
                rowsProduccionUpdate.push(rows) // Asignar aquí
            }

            const [rowsParte, fieldsParte] = await pool.query(
                'SELECT * FROM PARTE_CORTABLOQUES WHERE id = ?',
                [id]
            )

            const [rowsProduccion, fieldsProduccion] = await pool.query(
                'SELECT * FROM PRODUCCION_MAQUINA WHERE id_parte = ?',
                [id]
            )
            console.log('rowsProduccion', rowsProduccion)
            rowsParte.forEach((parte) => {
                parte.fecha_inicio = new Date(
                    parte.fecha_inicio.getTime() -
                        parte.fecha_inicio.getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .split('T')[0]
                parte.fecha_fin = new Date(
                    parte.fecha_fin.getTime() -
                        parte.fecha_fin.getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .split('T')[0]

                parte.bis === 1 ? (parte.bis = true) : (parte.bis = false)
                parte.retal === 1 ? (parte.retal = true) : (parte.retal = false)
                if (parte.retal === true) {
                    parte.numero_bloque = null
                }
                parte.produccionMaquina = []
                rowsProduccion.forEach((produccion) => {
                    if (produccion.id_parte === parte.id) {
                        console.log('Produccion', produccion)
                        parte.produccionMaquina.push(produccion)
                    }
                })
            })

            res.status(200).json({
                message: 'Parte de cortabloques actualizado correctamente',
                parte: rowsParte[0],
            })
        } catch (error) {
            next(error)
        }
    },
    eliminar: async (req, res, next) => {
        const { id } = req.params
        try {
            await pool.query(
                'DELETE FROM PRODUCCION_MAQUINA WHERE id_parte = ?',
                [id]
            )

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
module.exports = ParteCortabloques
