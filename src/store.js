import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  getters: {
    notes: state => state.notes
  },
  mutations: {
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
