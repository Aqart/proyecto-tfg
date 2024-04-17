export const getTrabajadores = (state) => {
  return state.trabajadores
}

export const getTrabajadorById = (state) => (id) => {
  return state.trabajadores.find((trabajador) => trabajador.id === id)
}

export const getResponse = (state) => {
  return state.response
}
