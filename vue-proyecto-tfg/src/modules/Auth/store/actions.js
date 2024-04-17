import authApi from '@/api/stoneApi'
import { jwtDecode } from 'jwt-decode'

// export const myAction = async ({ commit }) => {

// }
export const createUser = async (user) => {
  const { email, roles, password } = user
  if (localStorage.getItem('idToken') === null) {
    //this.$router.push({ name: 'login' })
    return { ok: false, message: '....' }
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
    console.log(data)
    return { ok: true, message: '....' }
  } catch (error) {
    console.log(error)
    return { ok: false, message: '....' }
  }
}

export const loginUser = async ({ dispatch, commit }, user) => {
  console.log('USER', user)
  const { email, password } = user
  try {
    const { data } = await authApi.post('/login', { email, password })
    console.log('Login data', data)

    const isExpired = await dispatch('isTokenExpired')
    if (!isExpired) {
      console.log('Hace comprobación isToken')
      commit('loginUser', { email: email, idToken: localStorage.getItem('idToken') })
    } else {
      console.log('Hace comprobación isToken else')
      delete user.password
      commit('loginUser', { email: email, idToken: data.token })
    }

    return { ok: true, message: '....' }
  } catch (error) {
    console.error(error)
    return { ok: false, message: 'Email o Contraseña inválidos' }
  }
}

export const logoutUser = ({ commit }) => {
  console.log('logoutUserrr')
  // Borra el token del almacenamiento local
  localStorage.removeItem('idToken')

  // Borra el token del estado
  commit('logoutUser')
}

export const isTokenExpired = ({ state }) => {
  const token = state.idToken
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
