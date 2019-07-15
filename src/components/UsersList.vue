<template>
  <v-container>
    <v-text-field
      :value="username"
      label="Your name"
      @keydown.enter="changeName($event.target.value)"
    ></v-text-field>
    <h2>Users</h2>

    <v-card>
      <v-list>
        <template v-for="(user, index) in users">
          <v-list-tile :key="index">
            <v-text-field :value="user.username" @keydown.enter="editNote(note.id, $event.target.value)"></v-text-field>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>


  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    username() {
      return this.$store.getters.username;
    },
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    changeName(username) {
      this.$store.dispatch("CHANGE_NAME", { username });
    }
  }
};
</script>
