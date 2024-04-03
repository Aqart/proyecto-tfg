import authApi from '@/api/stoneApi'

export const fetchMaquinas = async ({ commit }) => {
    console.log('fetchMaquinas')
    if (localStorage.getItem('idToken') === null) {
        return { ok: false, message: '....' }
    }
    try {
        const response = await authApi.get('/maquinas', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
        })
    
        // Verifica si la solicitud fue exitosa y si la respuesta contiene datos
        if (response.status === 200 && response.data) {
    
        // Actualizar el estado con los maquinas obtenidos
        commit('setMaquinas', response.data)
        } else {
        console.error('Error al obtener los maquinas:', response.message)
        }
    } catch (error) {
        console.error('Error al obtener los maquinas:', error.message)
    }
    }

    export const createMaquina = async ({ commit }, maquina) => {
    if (localStorage.getItem('idToken') === null) {
        return { ok: false, message: '....' }
    }
    try {
        const response = await authApi.post('/maquinas', maquina, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
        })
        if (response.status === 201 && response.data) {
        commit('setMaquina', maquina)
        return { ok: true, message: response.data.message }
        }
        else {
        console.error('Error al obtener los maquinas:', response.message)
        return { ok: false, message: response.message }
        }
    }
    catch (error) {
        console.error('Error al crear el maquina:', error.message)
    }
    }
    export const editMaquina = async ({ commit }, maquina) => {
    console.log('Editar maquina')
    if (localStorage.getItem('idToken') === null) {
        return { ok: false, message: '....' }
    }
    try {
        const response = await authApi.put('/maquinas', maquina, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
        })
        if (response.status === 200 && response.data) {
        commit('setMaquina', maquina)
        return { ok: true, message: response.data.message }
        }
        else {
        console.error('Error al obtener los maquinas:', response.message)
        return { ok: false, message: response.message }
        }
    }
    catch (error) {
        console.error('Error al editar el maquina:', error.message)
    }
    }
    