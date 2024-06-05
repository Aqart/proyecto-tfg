export const setPartesCortabloques = (state, data) => {
  state.partesCortabloques = data
}

export const editParteCortabloques = (state, data) => {
  console.log('data', data)
  const index = state.partesCortabloques.findIndex((parte) => parte.id === data.id)
  state.partesCortabloques[index] = data
  console.log('state.partesCortabloques', state.partesCortabloques)
}
