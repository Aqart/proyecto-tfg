// export const myAction = ( state ) => {

// }
export const loginUser = (state, { email, idToken }) => {
  if (idToken) {
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('email', email)
    // Obtiene el token del almacenamiento local después de guardarlo
    state.idToken = localStorage.getItem('idToken')
    state.email = localStorage.getItem('email')
  }
}

// En vue-proyecto-tfg/src/modules/Auth/store/mutations.js
export const logoutUser = (state) => {
  // Borra el token del almacenamiento local
  
  localStorage.removeItem('idToken')
  state.idToken = null
  state.email = null
}
