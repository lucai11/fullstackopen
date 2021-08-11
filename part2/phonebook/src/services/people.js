import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/persons'


const getPeople = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const createPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(request => request.data)
}
const peopleServices = {
    createPerson, getPeople, deletePerson, updatePerson
}

export default peopleServices