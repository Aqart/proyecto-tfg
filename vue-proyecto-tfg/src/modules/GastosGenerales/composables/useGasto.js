import { useStore } from 'vuex'

const useGasto = () => {
  const store = useStore()

  const getGastos = async () => {
    console.log(store)
    const resp = await store.dispatch('GastosGenerales/fetchGastos')
    console.log('respGastos', resp)
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
  const editGasto = async (id, gasto) => {
    const resp = await store.dispatch('GastosGenerales/editGasto', { id: id, gasto: gasto })
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
