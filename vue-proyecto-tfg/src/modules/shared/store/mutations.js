export const setMessage = (state, mensaje) => {
  state.mensajeVista = mensaje
  console.log('Mensaje vista', state.mensajeVista)
}

export const setType = (state, type) => {
  state.typeVista = type
  console.log('Tipo vista', state.typeVista)
}

export const setMostrar = (state, mostrar) => {
  state.mostrarVista = mostrar
  console.log('Mostrar vista', state.mostrarVista)
}
