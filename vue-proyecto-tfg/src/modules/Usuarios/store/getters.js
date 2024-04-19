export const getUsuarios = (state) => {
  return state.usuarios
}

export const getUsuarioById = (state) => (id) => {
  return state.usuarios.find((usuario) => usuario.id === id)
}

export const getResponse = (state) => {
  return state.response
}
