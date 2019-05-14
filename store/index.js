import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'


const debug = process.env.NODE_ENV !== 'production'

const store = () => new Vuex.Store({
    state: {
        selectedItem: {
            id: null,
            name: null,
            image_path: null
        }
    },
    getters: {
        selectedItem: state => state.selectedItem
    },
    mutations: {
        setItem(state, {
            id = null,
            name= null,
            image_path= null
        }) {
            state.selectedItem.id = id
            state.selectedItem.name = name
            state.selectedItem.image_path = image_path
        },
        resetItem(state) {
            state.selectedItem.id = null
            state.selectedItem.name = null
            state.selectedItem.image_path = null
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
export default store