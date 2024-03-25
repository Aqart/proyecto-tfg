//Esta función genera un hash de contraseña con la contraseña proporcionada.
//El hash de la contraseña se genera utilizando la función hash de la biblioteca bcrypt.
//El costo de hashing se establece en 10, lo que significa que se realizarán 2^10 iteraciones para generar el hash.
//El hash de la contraseña generada se devuelve como una promesa.
//Si se produce un error al generar el hash de la contraseña, se captura y se lanza el error.

const bcrypt = require('bcrypt')

async function generateHashedPassword(password) {
    try {
        // Genera el hash de la contraseña con un costo de hashing de 10
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        console.error('Error al generar la contraseña con hash:', error)
        throw error // Maneja el error según sea necesario
    }
}

// Ejemplo de uso
const password = 'admin' // Define la contraseña que deseas hashear
generateHashedPassword(password)
    .then((hashedPassword) => {
        console.log('Contraseña hasheada:', hashedPassword)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
