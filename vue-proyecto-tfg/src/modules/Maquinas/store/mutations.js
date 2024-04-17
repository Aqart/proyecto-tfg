export const setMaquinas = (state, data) => {
  state.maquinas = data
}
export const setMaquina = (state, { nombre, precio }) => {
  state.maquinas.push({ nombre, precio })
}
export const setResponse = (state, data) => {
  state.response = data
}
