export const setConsumibles = (state, data) => {
  state.consumibles = data
}

export const setConsumible = (state, { nombre, precio }) => {
  state.consumibles.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}

export const updateMessage = (state, mensaje) => {
  state.mensajeVista = mensaje
  console.log("Mensaje vista", state.mensajeVista)
}

export const updateType = (state, type) => { 
  state.typeVista = type
  console.log("Tipo vista", state.typeVista)
}
