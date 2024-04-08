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
      if (response.data.id) {
        consumible.id = response.data.id
      }
      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)

      commit('setNewConsumible', consumible)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los consumibles:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el consumible:', error.message)
  }
}

export const getConsumibleById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/consumibles/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      console.log(response.data)
      return response.data
    } else {
      console.error('Error al obtener el consumible:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.log('Error al obtener el consumible:', error)
  }
}

export const editConsumible = async ({ commit }, { id, consumible }) => {
  console.log('Editar consumible', id, consumible)
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.put(`/consumibles/${id}`, consumible, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    console.log('LA DATA', response.data)
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setConsumible', { id, consumible })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar consumible:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al editar el consumible:', error.message)
  }
}
