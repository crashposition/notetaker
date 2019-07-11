import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: window.navigator.onLine,
    notes: []
  },
  getters: {
    isConnected: state => state.isConnected,
    notes: state => state.notes
  },
  mutations: {
    SET_CONNECTED: (state, payload) => {
      state.isConnected = payload
    },
    ADD_NOTE: (state, payload) => {
      state.notes.push(payload.note);
    },
    EDIT_NOTE: (state, payload) => {
      state.notes[payload.index] = payload.note
    },
    DELETE_NOTE: (state, payload) => {
      state.notes.splice(payload.index, 1)
    }
  },
  actions: {
    SET_CONNECTED: (context, payload) => {
      context.commit("SET_CONNECTED", payload);
    },
    ADD_NOTE: (context, payload) => {
      context.commit("ADD_NOTE", payload);
    },
    EDIT_NOTE: (context, payload) => {
      context.commit("EDIT_NOTE", payload);
    },
    DELETE_NOTE: (context, payload) => {
      context.commit("DELETE_NOTE", payload);
    }
  }
});
