import authApi from '@/api/stoneApi'

// export const myAction = async ({ commit }) => {

// }
export const createUser = async ({ state }, user) => {
  const { email, roles, password } = user
  if (localStorage.getItem('idToken') === null) {
    //this.$router.push({ name: 'login' })
    return { ok: false, message: '....' }
  }
  try {
    const { data } = await authApi.post(
      '/registro',
      { email, roles, password },
      {
        headers: {
          Athorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      }
    )
    console.log(data)
    return { ok: true, message: '....' }
  } catch (error) {
    console.log(error)
    return { ok: false, message: '....' }
  }
}

export const loginUser = async ({ commit }, user) => {
  const { email, password } = user
  try {
    const { data } = await authApi.post('/login', { email, password })
    console.log("Login data", data)

    if(!isTokenExpired(localStorage.getItem('idToken') )){
      console.log("Hace comprobación isToken")
      commit('loginUser', { email: email, idToken: localStorage.getItem('idToken') })
    } else {
      console.log("Hace comprobación isToken else")
      delete user.password
      commit('loginUser', { email: email, idToken: data.token })
    }

    

    return { ok: true, message: '....' }
  } catch (error) {
    console.error(error)
    return { ok: false, message: '....' }
  }
}


export const isTokenExpired = async (token) => {
  console.log('isTokenExpired state', token)
  try {
    const { response } = await authApi.get('/verify',{
      headers: {
        Athorization: `Bearer ${ token }`
      }
    })

    if(response.ok === 'true') {
      return false
    } else {
      return true
    }
    
  } catch (error) {
    console.error(error)
  }


}
