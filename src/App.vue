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
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    getWifiIcon() {
      return this.$store.getters.isConnected ? "wifi" : "wifi_off"
    }
  },
  created() {
    window.addEventListener("offline", () => {
      this.$store.dispatch( 'SET_CONNECTED', false)
    });

    window.addEventListener("online", () => {
      this.$store.dispatch( 'SET_CONNECTED', true)
    });
  }
};
</script>
