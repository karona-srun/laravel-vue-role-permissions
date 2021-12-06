import axios from 'axios';
import { Header } from 'view-design';

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
            console.info('🚀 '+ JSON.stringify(response.data.access_token))
            // localStorage.setItem("accessToken",response.access_token)
            localStorage.setItem("accessToken",JSON.stringify(response.data.access_token))
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
    signOut({ commit }) {
        // return axios.post('/api/auth/sign-out')
        // .then(response => {
            // console.info('🚀 '+ JSON.stringify(response.data))
            localStorage.removeItem("accessToken")
            commit('signin', '');
            return "response.data";
        // }).catch(function (error){
        //     return error;
        // });
    
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
        return state.access_token !== null
    },
    isLoggedIn: state => !!state.access_token,
}

export default {
    state,
    getters,
    actions,
    mutations
}