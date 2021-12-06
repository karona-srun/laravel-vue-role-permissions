import axios from 'axios';

const state = {
    userdata: [],
    access_token: null
};

const mutations = {
    signin(state, payload) {
        state.userdata = payload.user
        state.access_token = payload.access_token
    },
    signup(state, payload) {
        state.userdata = payload
    },
    signout(state) {
        state.userdata = null
    }
};

const actions = {
    signIn({ commit }, data) {
        return axios.post('/api/auth/sign-in', {
            email: data.email,
            password: data.password
        })
        .then(response => {
            // console.info('🚀 '+ JSON.stringify(response.data))
            commit('signin', response.data);
            return response.data;
        }).catch(function (error){
            return error;
        });
    
    },
    signUp({ commit }, data) {
        return axios.post('/api/auth/sign-up', {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        })
        .then(response => {
            // console.log("api Success: ", response.data);
            return response.data;
        }).catch(err => {
            // console.log("api Erorr: ", err.response.data);
            return err.response.data;
        })
    
    },
    forgotpassword({ commit }, email) {
        return axios.post('/api/auth/password/email', {
            email: email
        })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
    },
    resetpassword({ commit }, data) {
        return axios.post('/api/auth/password/reset', {
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            token: data.token
        })
        .then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
    }
};

const getters = {
    loggedIn: function (state) {
        return state.userdata !== null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}