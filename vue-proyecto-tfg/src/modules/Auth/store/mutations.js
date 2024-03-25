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
