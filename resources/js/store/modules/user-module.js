import axios from 'axios'
import Header from '../../api/header';

const state = {
    users: [],
    user: []
};

const getters = {
    usersList: state => state.users,
    user: state => state.user
};

const actions = {
    async fetchUsers({ commit }) {
        const response = await axios.get("/api/user", { headers: Header.responseHeaders() });
        commit("setUsers", response.data.users)
    },
    async addUsers({ commit }, user) {
        const response = await axios.post("/api/user",{ ...user }, { headers: Header.responseHeaders() });
        commit("addNewUser", response.data)
    },
    async showUser({ commit }, id) {
        const response = await axios.get(`/api/user/${id}`,{ headers: Header.responseHeaders() });
        commit("setUser", response.data.user)
    },
    async updateUser({ commit }, user) {
        const response = await axios.patch(`/api/user/${user.id}`, user, { headers: Header.responseHeaders() });
        commit("setUser", response.data.user)
    },
    async deleteUser({ commit }, id) {
        const response = await axios.delete(`/api/user/${id}`, { headers: Header.responseHeaders() });
        console.log(response.data.user)
        commit("removeUser", id)
    },
    liveSearch({ commit }, data) {
        return axios.post('/api/user-livesearch', data,
        { headers: Header.responseHeaders() })
        .then(response => {
            if (response.status === 200) {
                return response.data.users;
            }
        })
    }
};

const mutations = {
    setUsers: (state, users) => (
        state.users = users
    ),
    setUser: (state, user) => (
        state.user = user
    ),
    addNewUser: (state, user) => state.users.unshift(user),
    removeUser: (state, id) => (
        state.users.filter(user => user.id !== id),
        state.users.splice(user => user.id, 1)
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}