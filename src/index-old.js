// index.js

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import AuthController from './src/controllers/AuthController'
import TrabajadorController from './src/controllers/TrabajadorController'
import MaquinaController from './src/controllers/MaquinaController'
import ConsumibleController from './src/controllers/ConsumibleController'
import GastoGeneralController from './src/controllers/GastoGeneralController'
import MateriaPrimaController from './src/controllers/MateriaPrimaController'
import TransporteController from './src/controllers/TransporteController'

const app = express()

// Middleware para habilitar CORS
app.use(cors())

/**
 * The port number for the server.
 * @type {number}
 */

const PORT = process.env.PORT || 3000

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json())

// Endpoint para registrar un usuario
app.post('/registro', AuthController.registrarUsuario)

// Endpoint para iniciar sesión
app.post('/login', AuthController.iniciarSesion)

// Middleware para verificar el token JWT en las rutas protegidas
app.use(AuthController.verificarToken)

// Rutas protegidas

// Endpoints para Trabajadores
app.get('/trabajadores', TrabajadorController.obtenerTodos)
app.post('/trabajadores', TrabajadorController.crear)
app.get('/trabajadores/:id', TrabajadorController.obtenerPorId)
app.put('/trabajadores/:id', TrabajadorController.actualizar)
app.delete('/trabajadores/:id', TrabajadorController.eliminar)

// Endpoints para Máquinas

// Endpoint para asociar un consumible a una máquina
app.post(
    '/maquinas/:maquinaId/consumibles/:consumibleId',
    MaquinaController.asociarConsumible
)

// Endpoint para desasociar un consumible de una máquina
app.delete(
    '/maquinas/:maquinaId/consumibles/:consumibleId',
    MaquinaController.desasociarConsumible
)

app.get('/maquinas', MaquinaController.obtenerTodas)
app.post('/maquinas', MaquinaController.crear)
app.get('/maquinas/:id', MaquinaController.obtenerPorId)
app.put('/maquinas/:id', MaquinaController.actualizar)
app.delete('/maquinas/:id', MaquinaController.eliminar)

// Endpoints para Consumibles
app.get('/consumibles', ConsumibleController.obtenerTodos)
app.post('/consumibles', ConsumibleController.crear)
app.get('/consumibles/:id', ConsumibleController.obtenerPorId)
app.put('/consumibles/:id', ConsumibleController.actualizar)
app.delete('/consumibles/:id', ConsumibleController.eliminar)

// Endpoints para Gastos Generales
app.get('/gastos-generales', GastoGeneralController.obtenerTodos)
app.post('/gastos-generales', GastoGeneralController.crear)
app.get('/gastos-generales/:id', GastoGeneralController.obtenerPorId)
app.put('/gastos-generales/:id', GastoGeneralController.actualizar)
app.delete('/gastos-generales/:id', GastoGeneralController.eliminar)

// Endpoints para Materias Primas
app.get('/materias-primas', MateriaPrimaController.obtenerTodas)
app.post('/materias-primas', MateriaPrimaController.crear)
app.get('/materias-primas/:id', MateriaPrimaController.obtenerPorId)
app.put('/materias-primas/:id', MateriaPrimaController.actualizar)
app.delete('/materias-primas/:id', MateriaPrimaController.eliminar)

// Endpoints para Transportes
app.get('/transportes', TransporteController.obtenerTodos)
app.post('/transportes', TransporteController.crear)
app.get('/transportes/:id', TransporteController.obtenerPorId)
app.put('/transportes/:id', TransporteController.actualizar)
app.delete('/transportes/:id', TransporteController.eliminar)

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message,
    })
})

// Iniciar el servidor
app.listen(PORT, () => {
    
})
