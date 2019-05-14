import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9999/'
});

export const getUsers = () => instance.get('/user')

export const addItem = (userId, item) => {
    const {
        name,
        image_path
    } = item
    return instance.post(`/user/${userId}/item`, {
        name,
        image_path
    })
}

export const getItems = (userId) => instance.get(`/user/${userId}/items`)

export const updateItem = (userId, item) => {
    const {
        id,
        name,
        image_path
    } = item
    return instance.post(`/user/${userId}/item/${id}`, {
        name,
        image_path
    })
}

export const removeItem = (userId, id) => instance.delete(`/user/${userId}/item/${id}`)