import { useStore } from 'vuex'

const useMaquina = () => {
  const store = useStore()

  const getMaquinas = async () => {
    
    const resp = await store.dispatch('Maquinas/fetchMaquinas')
    return resp
  }

  const createMaquina = async (maquina) => {
    const resp = await store.dispatch('Maquinas/createMaquina', maquina)
    return resp
  }

  const editMaquina = async (maquina) => {
    const resp = await store.dispatch('Maquinas/editMaquina', maquina)
    return resp
  }

  return {
    getMaquinas,
    createMaquina,
    editMaquina
  }

}

export default useMaquina