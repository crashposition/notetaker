<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Note</span>
        <span class="font-weight-light">Taker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>{{getWifiIcon}}</v-icon>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { setInterval, clearInterval } from "timers";
const uuidv1 = require("uuid/v1");

export default {
  name: "App",
  components: {},
  data() {
    return {
      intervalPing: null
    };
  },
  computed: {
    getWifiIcon() {
      return this.$store.getters.isConnected ? "wifi" : "wifi_off";
    }
  },
  methods: {
    onOnline() {
      this.$store.dispatch("SET_CONNECTED", true);
    },
    onOffline() {
      this.$store.dispatch("SET_CONNECTED", false);
    },
    pingUsers() {
      var payload = {};
      payload.user = {};
      payload.user.userID = this.$store.getters.userID;
      payload.user.username = this.$store.getters.username;
      payload.user.lastUpdated = Date.now();
      payload.notes =  this.$store.getters.notes;
      this.$store.dispatch("PING_USERS", payload);
    }
  },
  mounted() {
    // Listen for network changes
    window.addEventListener("offline", this.onOffline);
    window.addEventListener("online", this.onOnline);

    // username
    var userID = uuidv1();
    this.$store.dispatch("CHANGE_NAME_ID", { userID });
    this.$store.dispatch("CHANGE_NAME", { username: "Anonymous" });

    // Local storage
    if (localStorage.getItem("notes")) {
      var notes = JSON.parse(localStorage.getItem("notes"));
      this.$store.dispatch("INIT_NOTES", { notes });
    }

    // ping users
    this.intervalPing = setInterval(this.pingUsers, 3000);
  },
  beforeDestroy() {
    window.removeEventListener("offline", this.onOffline);
    window.removeEventListener("online", this.onOnline);
    clearInterval(this.intervalPing);
  }
};
</script>
