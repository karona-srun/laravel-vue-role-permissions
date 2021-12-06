import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        auth
    },
    state: {
        isLoggedIn: !!localStorage.getItem('token')
    },
    mutations: {
        loginUser (state) {
            state.isLoggedIn = true
        },
        logoutUser (state) {
            state.isLoggedIn = false
        },
    }
})