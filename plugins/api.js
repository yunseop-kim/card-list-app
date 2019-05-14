import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:9999/'
});

export const getUsers = () => instance.get('/user').then(value => value.data)

export const addItem = (userId, item) => {
    const {
        name,
        image_path
    } = item
    return instance.post(`/user/${userId}/item`, {
        name,
        image_path
    }).then(value => value.data)
}

export const getItems = (userId) => instance.get(`/user/${userId}/items`).then(value => value.data)

export const updateItem = (userId, item) => {
    const {
        id,
        name,
        image_path
    } = item
    return instance.post(`/user/${userId}/item/${id}`, {
        name,
        image_path
    }).then(value => value.data)
}

export const removeItem = (userId, id) => instance.delete(`/user/${userId}/item/${id}`).then(value => value.data)