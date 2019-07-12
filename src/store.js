import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: window.navigator.onLine,
    username: "",
    notes: [],
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false
    }
  },
  getters: {
    isConnected: state => state.isConnected,
    username: state => state.username,
    notes: state => state.notes
  },
  mutations: {
    SET_CONNECTED: (state, payload) => {
      state.isConnected = payload;
    },
    CHANGE_NAME: (state, payload) => {
      state.username = payload.username;
    },
    ADD_NOTE: (state, payload) => {
      state.notes.push(payload.note);
    },
    EDIT_NOTE: (state, payload) => {
      var index = state.notes.findIndex(item => item.id === payload.note.id);
      state.notes.splice(index, 1, payload.note);
    },
    DELETE_NOTE: (state, payload) => {
      state.notes = state.notes.filter(function(note) {
        return note.id !== payload.id;
      });
    },
    REPLACE_NOTES: (state, payload) => {
      // TODO: Sub optimal
      state.notes = payload.notes;
    },
    // SOCKETS ---------------------------
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      console.info(state, event);
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    }
  },
  actions: {
    SET_CONNECTED: (context, payload) => {
      context.commit("SET_CONNECTED", payload);
    },
    CHANGE_NAME: (context, payload) => {
      context.commit("CHANGE_NAME", payload);
    },
    ADD_NOTE: (context, payload) => {
      context.commit("ADD_NOTE", payload);
    },
    EDIT_NOTE: (context, payload) => {
      context.commit("EDIT_NOTE", payload);
    },
    DELETE_NOTE: (context, payload) => {
      context.commit("DELETE_NOTE", payload);
    },
    REPLACE_NOTES: (context, payload) => {
      context.commit("REPLACE_NOTES", payload);
    }
    /*
        sendMessage: function(context, message) {
      .....
      Vue.prototype.$socket.sendObj( {message: message} )
      .....
    }
    */
  }
});
