export const getConsumibles = (state) => {
  console.log('Getter', state)
  return state.consumibles
}

export const getResponse = (state) => {
  console.log('Getter', state)
  return state.response
}
