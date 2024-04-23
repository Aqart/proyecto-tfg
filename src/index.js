import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

//Controladores
import AuthController from './controllers/AuthController.js'
import TrabajadorController from './controllers/TrabajadorController.js'
import MaquinaController from './controllers/MaquinaController.js'
import ConsumibleController from './controllers/ConsumibleController.js'
import GastoEnergeticoController from './controllers/GastoEnergeticoController.js'
import MateriaPrimaController from './controllers/MateriaPrimaController.js'
import TransporteController from './controllers/TransporteController.js'

//Relaciones
import ConsumibleMaquinaController from './controllers/Relations/ConsumibleMaquinaController.js'
import TransporteMateriaPrimaController from './controllers/Relations/TransporteMateriaPrimaController.js'
import GastoEnergeticoMaquinaController from './controllers/Relations/GastoEnergeticoMaquinaController.js'
import TrabajadorMaquinaController from './controllers/Relations/TrabajadorMaquinaController.js'

const app = express()

// Middleware para habilitar CORS
app.use(cors())

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json())

// Endpoint para registrar un usuario
app.post('/registro', AuthController.registrarUsuario)

// Endpoint para iniciar sesión
app.post('/login', AuthController.iniciarSesion)

// Middleware para verificar el token JWT en las rutas protegidas
app.use(AuthController.verificarToken)

// Rutas protegidas

app.post('/roles', AuthController.obtenerRoles)
// Endpoints para Trabajadores
app.get('/trabajadores', TrabajadorController.obtenerTodos)
app.post('/trabajadores', TrabajadorController.crear)
app.get('/trabajadores/:id', TrabajadorController.obtenerPorId)
app.put('/trabajadores/:id', TrabajadorController.actualizar)
app.delete('/trabajadores/:id', TrabajadorController.eliminar)
app.post(
    '/trabajadores/:trabajador_id/maquinas/:maquina_id',
    TrabajadorMaquinaController.asociarTrabajadorMaquina
)

app.get(
    '/trabajadores/:trabajador_id/maquinas',
    TrabajadorMaquinaController.obtenerMaquinasPorTrabajador
)

// Endpoints para Máquinas
app.get('/maquinas', MaquinaController.obtenerTodas)
app.post('/maquinas', MaquinaController.crear)
app.get('/maquinas/:id', MaquinaController.obtenerPorId)
app.put('/maquinas/:id', MaquinaController.actualizar)
app.delete('/maquinas/:id', MaquinaController.eliminar)
app.get(
    '/maquinas/:maquina_id/trabajadores',
    TrabajadorMaquinaController.obtenerTrabajadoresPorMaquina
)
app.get(
    '/maquinas/:maquina_id/gastos-energeticos',
    GastoEnergeticoMaquinaController.obtenerGastosPorMaquina
)
app.get(
    '/maquinas/:maquina_id/consumibles',
    ConsumibleMaquinaController.obtenerConsumiblesPorMaquina
)
app.get(
    '/maquinas/:maquina_id/',
    GastoEnergeticoMaquinaController.obtenerMaquinasPorGasto
)

// Endpoints para Consumibles
app.get('/consumibles', ConsumibleController.obtenerTodos)
app.post('/consumibles', ConsumibleController.crear)
app.get('/consumibles/:id', ConsumibleController.obtenerPorId)
app.put('/consumibles/:id', ConsumibleController.actualizar)
app.delete('/consumibles/:id', ConsumibleController.eliminar)
app.get(
    '/consumibles/:consumible_id/maquinas',
    ConsumibleMaquinaController.obtenerMaquinasPorConsumible
)
app.post(
    '/consumibles/:consumible_id/maquinas/:maquina_id',
    ConsumibleMaquinaController.asociarConsumibleMaquina
)
app.delete(
    '/consumibles/:consumible_id/maquinas/:maquina_id',
    ConsumibleMaquinaController.desasociarConsumibleMaquina
)

// Endpoints para Gastos Energeticos
app.get('/gastos-energeticos', GastoEnergeticoController.obtenerTodos)
app.post('/gastos-energeticos', GastoEnergeticoController.crear)
app.get('/gastos-energeticos/:id', GastoEnergeticoController.obtenerPorId)
app.put('/gastos-energeticos/:id', GastoEnergeticoController.actualizar)
app.delete('/gastos-energeticos/:id', GastoEnergeticoController.eliminar)
app.get(
    '/gastos-energeticos/:gasto_id/maquinas',
    GastoEnergeticoMaquinaController.obtenerMaquinasPorGasto
)
app.post(
    '/gastos-energeticos/:gasto_id/maquinas/:maquina_id',
    GastoEnergeticoMaquinaController.asociarGastoMaquina
)
app.delete(
    '/gastos-energeticos/:gasto_id/maquinas/:maquina_id',
    GastoEnergeticoMaquinaController.desasociarGastoMaquina
)

// Endpoints para Materias Primas
app.get('/materias-primas', MateriaPrimaController.obtenerTodas)
app.post('/materias-primas', MateriaPrimaController.crear)
app.get('/materias-primas/:id', MateriaPrimaController.obtenerPorId)
app.put('/materias-primas/:id', MateriaPrimaController.actualizar)
app.delete('/materias-primas/:id', MateriaPrimaController.eliminar)
app.get(
    '/materias-primas/:materia_prima_id/transportes',
    TransporteMateriaPrimaController.obtenerTransportesPorMateriaPrima
)

// Endpoints para Transportes
app.get('/transportes', TransporteController.obtenerTodos)
app.post('/transportes', TransporteController.crear)
app.get('/transportes/:id', TransporteController.obtenerPorId)
app.put('/transportes/:id', TransporteController.actualizar)
app.delete('/transportes/:id', TransporteController.eliminar)
app.get(
    '/transportes/:transporte_id/materias-primas',
    TransporteMateriaPrimaController.obtenerMateriasPrimasPorTransporte
)
app.post(
    '/transportes/:transporte_id/materias-primas/:materia_prima_id',
    TransporteMateriaPrimaController.asociarMateriaPrimaTransporte
)
app.delete(
    '/transportes/:transporte_id/materias-primas/:materia_prima_id',
    TransporteMateriaPrimaController.desasociarMateriaPrimaTransporte
)

//Endpoints para Usuarios
app.get('/usuarios', AuthController.obtenerTodos)
app.get('/usuarios/:id', AuthController.obtenerPorId)
app.put('/usuarios/:id', AuthController.actualizar)
app.delete('/usuarios/:id', AuthController.eliminar)

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

// Función para buscar un puerto disponible
function buscarPuertoDisponible(port) {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            server.close(() => {
                resolve(port)
            })
        })
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                buscarPuertoDisponible(port + 1)
                    .then(resolve)
                    .catch(reject)
            } else {
                reject(err)
            }
        })
    })
}

// Iniciar el servidor en un puerto disponible
buscarPuertoDisponible(3000)
    .then((port) => {
        const PORT = process.env.PORT || port
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error al buscar puerto disponible:', err)
    })
