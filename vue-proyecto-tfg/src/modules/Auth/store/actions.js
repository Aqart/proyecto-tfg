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
    console.log(data)
    delete user.password
    commit('loginUser', { email: email, idToken: data.token })
    return { ok: true, message: '....' }
  } catch (error) {
    console.log(error)
    return { ok: false, message: '....' }
  }
}
