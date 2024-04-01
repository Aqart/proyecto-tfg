import { useStore } from 'vuex'

const useGasto = () => {
  const store = useStore()

  const getGastos = async () => {
    console.log(store)
    const resp = await store.dispatch('GastosGenerales/fetchGastos')
    console.log('respGastos', resp)
    return resp
  }

  const createGasto = async (gastos) => {
    const resp = await store.dispatch('GastosGenerales/createGasto', gastos)
    return resp
  }

  return {
    getGastos,
    createGasto
  }

}

export default useGasto