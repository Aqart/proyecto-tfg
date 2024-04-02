// export const myAction = ( state ) => {

// }
export const loginUser = (state, { email, idToken }) => {
  console.log('loginUser', email, idToken)
  if (idToken) {
    localStorage.setItem('idToken', idToken)
    state.idToken = idToken
  }
  state.email = email
  state.status = 'Authenticated'
}

// En vue-proyecto-tfg/src/modules/Auth/store/mutations.js
export const logoutUser = (state) => {
  localStorage.removeItem('idToken')
  state.idToken = null
  state.email = null
  state.status = 'Unauthenticated'
}