import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        title: 'app',
        music: {
            id: '',
            img: ''
        }
    },
    actions: {},
    mutations: {
        setTitle: (state, str) => {
            state.title = str
        }
    },
    getters: {
        getTitle: (state) => {
            return state.title
        }
    },
    modules: {}
})

export default store
