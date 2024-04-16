import { useStore } from 'vuex'

const useTransporte = () => {
  const store = useStore()

  const getTransportes = async () => {
    const resp = await store.dispatch('Transportes/fetchTransportes')
    return resp
  }

  const getTransporte = async (id) => {
    const resp = await store.dispatch('Transportes/getTransporteById', id)
    return resp
  }

  const createTransporte = async (Transporte) => {
    const resp = await store.dispatch('Transportes/createTransporte', Transporte)
    return resp
  }

  const editTransporte = async (Transporte) => {
    const resp = await store.dispatch('Transportes/editTransporte', Transporte)
    return resp
  }

  const deleteTransportes = async (Transportes) => {
    console.log('Dentro del useTransporte del delete')
    const resp = await store.dispatch('Transportes/deleteTransportes', Transportes)
    console.log(resp)
    return resp
  }

  return {
    getTransportes,
    createTransporte,
    editTransporte,
    getTransporte,
    deleteTransportes
  }
}

export default useTransporte
