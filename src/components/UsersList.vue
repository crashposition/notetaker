<template>
  <v-container>
    <v-text-field
      :value="username"
      label="Your name"
      @keydown.enter="changeName($event.target.value)"
    ></v-text-field>
    <h2>Users</h2>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    username() {
      return this.$store.getters.username;
    }
  },
  methods: {
    changeName(username) {
      this.$store.dispatch("CHANGE_NAME", { username });
    }
  },
  watch: {
    username: {
      handler() {
        console.log("Username changed!");
        localStorage.setItem("username", JSON.stringify(this.username));
      },
      deep: true
    }
  },
  mounted() {
    console.log("App mounted!");
    if (localStorage.getItem("username")) {
      var username = JSON.parse(localStorage.getItem("username"));
      this.$store.dispatch("CHANGE_NAME", { username });
    }
  }
};
</script>
