import { useStore } from 'vuex'

const useConsumible = () => {
  const store = useStore()

  const getConsumibles = async () => {
    const resp = await store.dispatch('Consumible/fetchConsumibles')

    return resp
  }

  const createConsumible = async (consumible) => {
    const resp = await store.dispatch('Consumible/createConsumible', consumible)
    return resp
  }

  return {
    getConsumibles,
    createConsumible
  }

}

export default useConsumible