import { useStore } from 'vuex'

const useAuth = () => {
  const store = useStore()

  const createUser = async (user) => {
    const resp = await store.dispatch('Auth/createUser', user)

    return resp
  }

  const loginUser = async (user) => {
    const resp = await store.dispatch('Auth/loginUser', user)
    return resp
  }

  return {
    createUser,
    loginUser
  }
}

export default useAuth