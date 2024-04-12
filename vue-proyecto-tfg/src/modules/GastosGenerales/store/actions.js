import authApi from '@/api/stoneApi'

export const fetchGastos = async ({ commit }) => {
  console.log('fetchGastos')
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/gastos-generales', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      console.log('Fetch Get', response.data)

      // Actualizar el estado con los consumibles obtenidos
      commit('setGastos', response.data)
    } else {
      console.error('Error al obtener los gastos:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const createGasto = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/gastos-generales', gasto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
      console.log('RESPONSE DATA', response.status, response.data)

      console.log('Gastos action', gasto)

      if (response.data.id) {
        gasto.id = response.data.id
      }
      // Actualizar el estado con los consumibles obtenidos
      //commit('setResponse', response.data)
      commit('setNewGasto', gasto)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los gastos:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al obtener los gastos:', error.message)
  }
}

export const getGastoById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/gastos-generales/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      console.log(response.data)
      return response.data
    } else {
      console.error('Error al obtener el gasto:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.log('Error al obtener el consumible:', error)
  }
}

export const editGasto = async ({ commit }, gasto) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = gasto
  try {
    const response = await authApi.put(`/gastos-generales/${id}`, gasto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    console.log('LA DATA', response.data)
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      console.log('Fetch Get', response.data)

      // Actualizar el estado con los consumibles obtenidos
      commit('setGasto', { id, gasto })
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener el gasto:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.log('Error al editar el gasto:', error)
  }
}
