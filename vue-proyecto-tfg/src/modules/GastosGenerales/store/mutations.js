export const setGastos = (state, data) => {
  console.log(data)
  state.gastos = data
}

export const setGasto = (state, data) => {
  state.gastos = state.gastos.map(gasto => {
    if (gasto.id == data.id) {
      return { ...gasto, nombre: data.gasto.nombre, precio: data.gasto.precio }
    }
    return gasto
  })
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setNewGasto = (state, {nombre, precio}) => {
  state.gastos.push({nombre, precio})
}
