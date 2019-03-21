import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: [
      { id: 1, name: 'Client 22' }
    ]
  },
  getters: {
    clients: state => state.clients,
    clientsCount: (state, getters) => getters.clients.length
  },
  mutations: {
    pushClient (state, newClient) {
      state.clients.push(newClient)
    },
    updateClient (state, modifiedClient) {
      let client = state.clients.find(x => x.id == modifiedClient.id)
      client.name = modifiedClient.name
    },
    removeClient (state, id) {
      state.clients = state.clients.find(x => x.id != id) || []
    }
  },
  actions: {
    async setNewClient (context, newClient) {
      context.commit('pushClient', newClient)
      return Promise.resolve()
    },
    async updateClient (context, modifiedClient) {
      context.commit('updateClient', modifiedClient)
      return Promise.resolve()
    },
    async removeClient (context, id) {
      context.commit('removeClient', id)
      return Promise.resolve()
    }
  }
})
