// export const myAction = ( state ) => {

// }
export const loginUser = (state, { email, idToken, roles }) => {
  if (idToken) {
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('email', email)
    localStorage.setItem('roles', roles)
    // Obtiene el token del almacenamiento local después de guardarlo
    state.idToken = localStorage.getItem('idToken')
    state.email = localStorage.getItem('email')
    state.roles = localStorage.getItem('roles')
  }
  console.log('STATE', state)
}

// En vue-proyecto-tfg/src/modules/Auth/store/mutations.js
export const logoutUser = (state) => {
  // Borra el token del almacenamiento local
  localStorage.removeItem('idToken')
  localStorage.removeItem('email')
  localStorage.removeItem('roles')

  state.idToken = null
  state.email = null
  state.roles = null
}

export const setRoles = (state, roles) => {
  state.roles = roles
}
