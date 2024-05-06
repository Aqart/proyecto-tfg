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
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.post('/registro', { numero_trabajador, email, roles, password }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 201 && response.data) {
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
    const response = await authApi.get(`/Usuarios/${id}`, {
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

export const editUsuario = async ({ commit }, Usuario) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const { id } = Usuario
  try {
    const response = await authApi.put(`/Usuarios/${id}`, Usuario, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })

    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      // Hacer un mutation que actualice los consumibles de Vuex
      commit('setUsuario', { id, Usuario })

      return { ok: true, message: response.data.message }
    } else {
      console.error('Error al editar Usuario:', response.data.message)
      return { ok: false, message: response.data.message }
    }
  } catch (error) {
    console.error('Error al editar el Usuario (persistencia):', error.message)
  }
}

export const deleteUsuarios = async ({ commit }, Usuarios) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  const results = []

  // Se utiliza bucle for...of en lugar de foreach para utilizar await y esperar a que cada promesa se resuelva antes de continuar con la siguiente iteración

  for (const Usuario of Usuarios) {
    const { id } = Usuario

    try {
      const response = await authApi.delete(`/Usuarios/${id}`, {
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
