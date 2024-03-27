export const setConsumibles = (state, data) => {
  console.log(data)
  state.consumibles = data
  console.log(state.consumibles)
}

export const setConsumible = (state, { nombre, precio }) => {
  state.consumibles.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}
