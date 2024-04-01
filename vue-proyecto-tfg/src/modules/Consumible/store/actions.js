import authApi from '@/api/stoneApi'

export const fetchConsumibles = async ({ commit }) => {
  console.log('fetchConsumibles')
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/consumibles', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {

      // Actualizar el estado con los consumibles obtenidos
      commit('setConsumibles', response.data)
    } else {
      console.error('Error al obtener los consumibles:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los consumibles:', error.message)
  }
}

export const createConsumible = async ({ commit }, consumible) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/consumibles', consumible, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {

      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)
      commit('setConsumible', consumible)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los consumibles:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener los consumibles:', error.message)
  }
}

export const actualizarMensaje = ({ commit }, { tipo, mensaje }) => {
  commit('updateMessage', mensaje)
  commit('updateType', tipo)
}
