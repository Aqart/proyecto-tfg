import authApi from '@/api/stoneApi'

export const fetchUsuarios = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get('/usuarios', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Actualizar el estado con los Usuarios obtenidos
      commit('setUsuarios', response.data)
    } else {
      console.error('Error al obtener los usuarios:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.message)
  }
}

export const createUsuario = async ({ commit }, usuario) => {
  const { numero_trabajador, email, roles, password } = usuario
  const { nombre, apellido1, apellido2 } = usuario
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post(
      '/registro',
      { numero_trabajador, email, roles, password },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      }
    )

    const response2 = await authApi.post(
      'empleados',
      { numero_trabajador, nombre, apellido1, apellido2 },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      }
    )

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if ((response.status === 201 && response.data) && (response2.status === 201 && response2.data)) {
      console.log('Usuario creado:', response)
      // Actualiza el objeto usuario con la respuesta de la API
      commit('setNewUsuario', response.data.user)
      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al obtener los usuarios:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.error('Error al crear el usuario:', error.message)
  }
}

export const getUsuarioById = async ({ commit }, id) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      response.data.ok = true
      return response.data
    } else {
      console.error('Error al obtener el Usuario:', response.message)
      return { ok: false, message: response.message }
    }
  } catch (error) {
    console.log('Error al obtener el Usuario:', error)
    return { ok: false, message: 'Error en el acceso a usuarios' }
  }
}

export const editUsuario = async ({ commit }, usuario) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id, numero_trabajador, email, roles, password } = usuario
  const { id_empleado, nombre, apellido1, apellido2 } = usuario
  try {
    const response = await authApi.put(`/usuarios/${id}`, { numero_trabajador, email, roles, password }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    const response2 = await authApi.post(
      `empleados/${id_empleado}`,
      { numero_trabajador, nombre, apellido1, apellido2 },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      }
    )

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if ((response.status === 200 && response.data) && (response2.status === 200 && response2.data)) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setUsuario', { id, usuario })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar usuario:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el usuario (persistencia):', error.message)
  }
}

export const deleteUsuarios = async ({ commit }, usuarios) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración

  for (const usuario of usuarios) {
    const { id } = usuario

    try {
      const response = await authApi.delete(`/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      })

      // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
      if (response.status === 200 && response.data) {
        // Hacer un mutation que elimine los consumibles de Vuex
        commit('deleteUsuario', id)
        results.push({ id, ok: true, message: response.data.message })
      } else {
        console.error('Error al eliminar Usuario:', response.data.message)
        results.push({ id, ok: false, message: response.data.message })
      }
    } catch (error) {
      console.error('Error al eliminar los Usuarios:', error.message)
      results.push({ id, ok: false, message: error.message })
    }
  }
  return results
}
