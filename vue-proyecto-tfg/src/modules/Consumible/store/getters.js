export const getConsumibles = (state) => {
  console.log('Getter', state)
  return state.consumibles
}

export const getResponse = (state) => {
  console.log('Getter', state)
  return state.response
}

export const getMensaje = (state) => {
  console.log('TipoMensaje', state.mensajeVista)
  return state.mensajeVista
}

export const getTipo = (state) => {
  console.log('TipoVista', state.tipoVista)
  return state.typeVista
}
