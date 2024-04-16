export const setGastos = (state, data) => {
  state.gastos = data
}

export const setGasto = (state, data) => {
  state.gastos = state.gastos.map((gasto) => {
    if (gasto.id == data.id) {
      return { ...gasto, ...data.gasto }
    }
    return gasto
  })
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setNewGasto = (state, gasto) => {
  state.gastos.push(gasto)
}


export const deleteGasto = (state, id) => {
  state.gastos = state.gastos.filter((gasto) => gasto.id != id)
}