import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

const API = `https://todo-rmichura-backend-app.herokuapp.com/api/`
// const API = `http://localhost:3000/api/`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
    emailUser: null,
    tasks: []
  },
  getters: {
    isAuth: state => state.token !== null,
    getEmailUser(state) {
      return state.emailUser
    },
    getAllTasks: state => state.tasks
  },
  mutations: {
    auth(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
    },
    setEmail(state, payload) {
      state.emailUser = payload.emailUser;
    },
    setTasks(state, payload) {
      state.tasks = payload.tasks;
    },
  },
  actions: {
    async login({commit, dispatch}, payload) {
      try {
        let response = await axios.post(`${API}login`, payload)
        commit('auth', {
          token: response.data.apiToken,
          userId: response.data._id
        })

        const now = new Date();
        const endDate = new Date(now.getTime() + 30 * 60000);
        localStorage.setItem('token', response.data.apiToken);
        localStorage.setItem('userId', response.data._id);
        localStorage.setItem('expires', endDate);

        setTimeout(() => {
          dispatch('logout');
        }, 30 * 60000);
      } catch (e) {
        console.log(e)
      }
    },

    logout({commit}) {
      commit('clearAuth')
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('expires');
      router.push('/')
    },

    autoLogin({commit, dispatch}) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const userId = localStorage.getItem('userId');
      if (!userId) {
        return;
      }
      const expirationDate = new Date(localStorage.getItem('expires'));
      const now = new Date();
      if (now >= expirationDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expires');
        return;
      }
      commit('auth', {
        token,
        userId
      })

      setTimeout(() => {
        dispatch('logout');
      }, expirationDate.getTime() - now.getTime());
    },

    async register({commit}, payload) {
      try {
        await axios.post(`${API}user`, payload)
      } catch (e) {
        console.log(e)
      }
    },

    async getEmail({commit}) {
      try {
        const userId = localStorage.getItem('userId');
        let {data} = await axios.get(`${API}user/${userId}`)
        commit('setEmail', {
          emailUser: data.user.email
        })
      } catch (e) {
        console.log(e)
      }
    },

    async editAccount({commit}, payload) {
      try {
        const userId = localStorage.getItem('userId');
        await axios.put(`${API}user/${userId}`, payload)
      } catch (e) {
        console.log(e)
      }
    },

    async saveTask({commit}, payload) {
      try {
        await axios.post(`${API}task`, payload)
      } catch (e) {
        console.log(e)
      }
    },

    async getTasks({commit}) {
      try {
        const userId = localStorage.getItem('userId');
        let { data } = await axios.get(`${API}task?user=${userId}`)
        commit('setTasks', {
          tasks: data
        })
      } catch (e) {
        console.log(e)
      }
    },

    async removeTask({state}, id) {
      try {
        const idTask = state.tasks[id]._id
        await axios.delete(`${API}task/${idTask}`)
        state.tasks.splice(id, 1)
      } catch (e) {
        console.log(e)
      }
    },

    async doneTask({state}, [id, payload]) {
      try {
        const idTask = state.tasks[id]._id
        await axios.put(`${API}task/${idTask}`, payload)
        state.tasks[id].done = true
      } catch (e) {
        console.log(e)
      }
    },

    async editTask({state}, [id, payload]) {
      try {
        const idTask = state.tasks[id]._id
        await axios.put(`${API}task/${idTask}`, payload)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
