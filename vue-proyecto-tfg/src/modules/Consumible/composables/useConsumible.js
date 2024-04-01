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

  const actualizarMensaje = (tipo, mensaje) => {
    store.dispatch('Consumible/actualizarMensaje', { tipo, mensaje }) 
  }

  return {
    getConsumibles,
    createConsumible,
    actualizarMensaje
  }

}

export default useConsumible