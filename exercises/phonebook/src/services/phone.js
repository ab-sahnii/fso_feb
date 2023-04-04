import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const remove = personId => { 
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const update = (id, updatedContact) => { 
    const request = axios.put(`${baseUrl}/${id}`, updatedContact)
    return request.then(response => response.data)
}


export default { getAll, create, remove, update}