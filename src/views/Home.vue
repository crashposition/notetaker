<template>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs8>
          <NotesList />
        </v-flex>
        <v-flex xs4>
          <UsersList />
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import UsersList from "../components/UsersList";
import NotesList from "../components/NotesList";

export default {
  components: {
    UsersList,
    NotesList
  }
};
</script>
