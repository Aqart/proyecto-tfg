import { useStore } from 'vuex'

const useConsumible = () => {
  const store = useStore()

  const getConsumibles = async () => {
    const resp = await store.dispatch('Consumible/fetchConsumibles')

    return resp
  }

  return {
    getConsumibles
  }

}

export default useConsumible