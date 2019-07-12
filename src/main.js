import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueNativeSock from "vue-native-websocket";

Vue.config.productionTip = false;

Vue.use(VueNativeSock, "wss://wss-echo-testing-challenge.prodpad.com", {
  store: store,
  format: "json",
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 100, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 300 // (Number) how long to initially wait before attempting a new (1000)
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
