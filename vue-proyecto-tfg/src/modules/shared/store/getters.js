export const getMensaje = (state) => {
  console.log('TipoMensajeGet', state.mensajeVista)
  return state.mensajeVista
}

export const getTipo = (state) => {
  console.log('TipoVistaGet', state.typeVista)
  return state.typeVista
}

export const getMostrar = (state) => {
  console.log('MostrarVistaGet', state.mostrarVista)
  return state.mostrarVista
}
