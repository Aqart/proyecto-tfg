import authApi from '@/api/stoneApi'
const pathPartes = '/partes'
export const fetchPartesCortabloques = async ({ commit }) => {
  if (localStorage.getItem('idToken') === null) {
    return { ok: false, message: '....' }
  }
  try {
    const response = await authApi.get(pathPartes + '/cortabloques', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
    if (response.status === 200 && response.data) {
      console.log(response.data)
      // Actualizar el estado con los partes del cortabloques obtenidos
      commit('setPartesCortabloques', response.data)
    } else {
      console.error('Error al obtener los partes del cortabloques:', response.message)
    }
  } catch (error) {
    console.error('Error al obtener los partes del cortabloques:', error.message)
  }
}
