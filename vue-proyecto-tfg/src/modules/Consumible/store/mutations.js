export const setConsumibles = (state, data) => {
  state.consumibles = data
}

export const setNewConsumible = (state, { nombre, precio }) => {
  state.consumibles.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}

