import authApi from '@/api/stoneApi'
import { jwtDecode } from 'jwt-decode'
import router from '@/router'

// export const myAction = async ({ commit }) => {

// }
export const createUser = async ({ state }, user) => {
  const { email, roles, password } = user
  if (localStorage.getItem('idToken') === null) {
    //this.$router.push({ name: 'login' })
    return { ok: false, message: '...' }
  }
  try {
    const { data } = await authApi.post(
      '/registro',
      { email, roles, password },
      {
        headers: {
          Athorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      }
    )

    return { ok: true, message: data.message }
  } catch (data) {
    return { ok: false, message: 'El usuario ya existe' }
  }
}

export const loginUser = async ({ dispatch, commit }, user) => {
  const { email, password } = user
  try {
    const { data } = await authApi.post('/login', { email, password })
    const isExpired = await dispatch('isTokenExpired')
    if (!isExpired) {
      commit('loginUser', {
        email: email,
        idToken: localStorage.getItem('idToken'),
        roles: data.roles
      })
    } else {
      delete user.password
      commit('loginUser', { email: email, idToken: data.token, roles: data.roles })
    }

    return { ok: true, message: '....' }
  } catch (error) {
    console.log(error)
    return { ok: false, message: 'Email o Contraseña inválidos' }
  }
}

export const logoutUser = ({ commit }) => {
  // Borra el token del almacenamiento local
  localStorage.removeItem('idToken')

  // Borra el token del estado
  commit('logoutUser')
}

export const isTokenExpired = ({ state, commit }) => {
  const token = state.idToken
  if (token !== localStorage.getItem('idToken')) {
    commit('logoutUser')
    router.push({ name: 'auth-login' })
    return
  }

  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const currentDate = new Date()
      const expirationDate = new Date(decodedToken.exp * 1000)
      return currentDate >= expirationDate
    } catch (error) {
      return true
    }
  }
  return true
}

export const obtenerRoles = async ({ commit }) => {
  try {
    const email = localStorage.getItem('email')
    const token = localStorage.getItem('idToken')
    const { data } = await authApi.post(
      '/roles',
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    commit('setRoles', data[0].roles)
  } catch (error) {
    console.log(error)
  }
}
