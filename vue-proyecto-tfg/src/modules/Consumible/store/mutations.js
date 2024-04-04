export const setConsumibles = (state, data) => {
  state.consumibles = data
}

export const setNewConsumible = (state, { nombre, precio }) => {
  state.consumibles.push({ nombre, precio })
}

export const setResponse = (state, data) => {
  state.response = data
}

export const setConsumible = (state, data) => {
  state.consumibles = state.consumibles.map(consumible => {
    if (consumible.id == data.id) {
      return { ...consumible, nombre: data.consumible.nombre, precio: data.consumible.precio }
    }
    return consumible
  })
}

