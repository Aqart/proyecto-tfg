let grosorCm = 3

const materiaPrima = [
    {
        tipo: 'bloquePrimera',
        cantidadM3: 1400,
        precio: 260,
    },
    {
        tipo: 'bloqueSegunda',
        cantidadM3: 1500,
        precio: 200,
    },
]

const transporte = [
    {
        nombre: 'viaje1',
        cantidad: 350,
        precio: 150,
    },
    {
        nombre: 'viaje2',
        cantidad: 400,
        precio: 10,
    },
]

const totalPrecioMateriaPrima = materiaPrima.reduce((a, b) => {
    let precioM3 = b.cantidadM3 * b.precio
    return a + precioM3
}, 0)
const totalCantidadM3MateriaPrima = materiaPrima.reduce((a, b) => {
    return a + b.cantidadM3
}, 0)

const totalPrecioTransporte = transporte.reduce((a, b) => {
    let totalPrecioTransporte = b.cantidad * b.precio
    return a + totalPrecioTransporte
}, 0)

let totalMateriaPrima =
    (totalPrecioMateriaPrima / totalCantidadM3MateriaPrima +
        totalPrecioTransporte / totalCantidadM3MateriaPrima) *
    (grosorCm / 100)
console.log('Precios', totalPrecioMateriaPrima)
console.log('Cantidad M3', totalCantidadM3MateriaPrima)
console.log('Total precio transporte', totalPrecioTransporte)

console.log('Total materia prima', totalMateriaPrima)
