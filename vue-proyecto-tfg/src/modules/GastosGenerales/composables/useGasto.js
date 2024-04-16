import { useStore } from 'vuex'

const useGasto = () => {
  const store = useStore()

  const getGastos = async () => {
    const resp = await store.dispatch('GastosGenerales/fetchGastos')
    return resp
  }
  const getGasto = async (id) => {
    const resp = await store.dispatch('GastosGenerales/getGastoById', id)
    return resp
  }

  const createGasto = async (gasto) => {
    const resp = await store.dispatch('GastosGenerales/createGasto', gasto)
    return resp
  }
  const editGasto = async (gasto) => {
    const resp = await store.dispatch('GastosGenerales/editGasto', gasto)
    return resp
  }

  return {
    getGastos,
    createGasto,
    editGasto,
    getGasto
  }
}

export default useGasto
