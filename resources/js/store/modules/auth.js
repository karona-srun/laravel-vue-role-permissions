import axios from 'axios';

const auth = {
    namespaced: true,
    state: {
        userdata: null
    },
    mutations: {
        signin(state, payload) {
            state.userdata = payload
        },
        signup(state, payload) {
            state.userdata = payload
        },
        signout(state) {
            state.userdata = null
        }
    },
    actions: {
        signin({ commit }, { email, password }) {
            axios({
                method: 'post',
                url: '/my/backend/url',
                data: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                if (response.status === 200) {
                    commit('signin', response.data)
                }
            })
        },
        signup({ commit }, { name, email, password, confirmation_password }) {
            axios({
                method: 'post',
                url: '/my/backend/url',
                data: {
                    name: name,
                    email: email,
                    password: password,
                    confirmation_password: confirmation_password
                }
            })
            .then(response => {
                if (response.status === 200) {
                    commit('signin', response.data)
                }
            })
        }
    },
    getters: {
        loggedIn:function(state) {
            return state.userdata !== null
        }
    }
}
export default auth