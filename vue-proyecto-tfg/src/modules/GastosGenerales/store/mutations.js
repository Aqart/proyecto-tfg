export const setGastos = (state, data) => {
  console.log(data)
  state.gastos = data
  console.log(state.gastos)
}

export const setGasto = (state, { nombre, precio }) => {
  state.gastos.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}
