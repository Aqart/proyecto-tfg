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

            const { roles } = user[0]

            res.status(200).json({ token, roles })
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

    obtenerTodos: async (req, res) => {
        try {
            const [rows, fields] = await pool.query(
                'SELECT id,email,roles FROM user'
            )
            res.status(200).json(rows)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios' })
        }
    },
    // Método para obtener un usuario por su id
    obtenerPorId: async (req, res) => {
        try {
            const id = req.params.id
            const [rows, fields] = await pool.query(
                'SELECT id,email,roles FROM user WHERE id = ?',
                [id]
            )
            res.status(200).json(rows[0])
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario' })
        }
    },
    // Método para actualizar un usuario
    actualizar: async (req, res) => {
        const { email, roles, password } = req.body
        // Verifica si el usuario ya existe en la base de datos
        const [existingUser] = await pool.query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        )
        if (existingUser.length > 0) {
            return res
                .status(400)
                .json({ message: 'El nombre de usuario ya existe' })
        }
        try {
            const id = req.params.id
            const { email, password, roles } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const [rows, fields] = await pool.query(
                'UPDATE user SET email = ?, roles = ?, password = ? WHERE id = ?',
                [email, roles, hashedPassword, id]
            )
            res.status(200).json({
                message: 'Usuario actualizado correctamente',
                body: { user: { email, roles } },
            })
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario' })
        }
    },
    // Método para eliminar un usuario
    eliminar: async (req, res) => {
        try {
            const id = req.params.id
            const [rows, fields] = await pool.query(
                'DELETE FROM user WHERE id = ?',
                [id]
            )
            res.status(200).json({ message: 'Usuario eliminado correctamente' })
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario' })
        }
    },
}

export default AuthController
