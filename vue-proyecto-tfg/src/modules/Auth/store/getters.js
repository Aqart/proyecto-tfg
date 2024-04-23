// export const myGetter = ( state ) => {
//  return state
// }

export const isLoggedIn = (state) => {
  return !!state.idToken
}

export const getEmail = (state) => {
  return state.email
}

export const getRoles = (state) => {
  return state.roles
}
