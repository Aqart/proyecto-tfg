export const setConsumibles = (state, data) => {
  state.consumibles = data
}

export const setConsumible = (state, { nombre, precio }) => {
  state.consumibles.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}
