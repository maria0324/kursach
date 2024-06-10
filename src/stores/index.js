import { createStore } from 'vuex';

export default createStore({
    state: {
        token: localStorage.getItem('token') || '',
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutations: {
        AUTH_SUCCESS: (state, token) => {
            state.token = token;
        },
        AUTH_ERROR: (state) => {
            state.token = '';
        },
        LOGOUT: (state) => {
            state.token = '';
        }
    },
    actions: {
        login({ commit }, token) {
            commit('AUTH_SUCCESS', token);
        },
        logout({ commit }) {
            commit('LOGOUT');
        },
    },
    modules: {}
});