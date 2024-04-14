// AuthController.js

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { pool } from '../db.js' // Importa el pool de conexión si estás utilizando pools

const AuthController = {
    // Registro de usuario
    registrarUsuario: async (req, res, next) => {
        const { email, roles, password } = req.body

        try {
            // Verifica si el usuario ya existe en la base de datos
            const [existingUser] = await pool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            )
            if (existingUser.length > 0) {
                return res
                    .status(400)
                    .json({ message: 'El nombre de usuario ya está en uso' })
            }

            // Hashea la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10)

            // Inserta el usuario en la base de datos
            await pool.query(
                'INSERT INTO user (email,roles,password) VALUES (?,?, ?)',
                [email, roles, hashedPassword]
            )

            res.status(201).json({
                message: 'Usuario registrado correctamente',
            })
        } catch (error) {
            next(error)
        }
    },

    // Inicio de sesión
    iniciarSesion: async (req, res, next) => {
        const { email, password } = req.body

        try {
            // Busca al usuario en la base de datos
            const [user] = await pool.query(
                'SELECT * FROM user WHERE email = ?',
                [email]
            )
            if (user.length === 0) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }

            // Compara la contraseña ingresada con la almacenada en la base de datos
            const match = await bcrypt.compare(password, user[0].password)
            if (!match) {
                return res
                    .status(401)
                    .json({ message: 'Credenciales inválidas' })
            }

            // Genera un token JWT
            const token = jwt.sign(
                { userId: user[0].id },
                process.env.JWT_SECRET,
                { expiresIn: '4h' }
            )

            res.status(200).json({ token })
        } catch (error) {
            next(error)
        }
    },

    // Middleware para verificar el token JWT
    verificarToken: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' })
        }

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decoded.userId
            next()
        } catch (err) {
            return res.status(401).json({ message: 'Token inválido' })
        }
    },
}

export default AuthController
