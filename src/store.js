import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isConnected: window.navigator.onLine,
    userID: "",
    username: "",
    users: [],
    notes: [],
    socket: {
      isConnected: false,
      message: "",
      reconnectError: false
    }
  },
  getters: {
    isConnected: state => state.isConnected,
    userID: state => state.userID,
    username: state => state.username,
    users: state => state.users,
    notes: state => state.notes
  },
  mutations: {
    SET_CONNECTED: (state, payload) => {
      state.isConnected = payload;
    },
    CHANGE_NAME: (state, payload) => {
      state.username = payload.username;
    },
    CHANGE_NAME_ID: (state, payload) => {
      state.userID = payload.userID;
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
    INIT_NOTES: (state, payload) => {
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
      console.log("Ping Receive");
      state.socket.message = message;

      // Manage Users
      if (message.payload.user.userID !== state.userID) {
        var newUser = message.payload.user;
        var userIndex = _.findIndex(state.users, function(o) {
          return o.userID == newUser.userID;
        });

        if (userIndex === -1) {
          state.users.push(newUser);
        } else {
          state.users.splice(userIndex, 1, newUser);
        }
      }

      // Manage Notes

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
    CHANGE_NAME_ID: (context, payload) => {
      context.commit("CHANGE_NAME_ID", payload);
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
    INIT_NOTES: (context, payload) => {
      context.commit("INIT_NOTES", payload);
    },
    PING_USERS: (context, payload) => {
      console.log("Ping Send");
      Vue.prototype.$socket.sendObj({ payload });
    }
  }
});
