<template>
  <v-container>
    <v-text-field v-model="newNote" label="Your note" @keydown.enter="addNote"></v-text-field>
    <h2>Notes</h2>

    <v-card>
      <v-list>
        <template v-for="(note, index) in notes">
          <v-list-tile :key="index">
            <v-text-field :value="note.text" @keydown.enter="editNote(note.id, $event.target.value)"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn fab small outline color="red" @click="deleteNote(note.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
const uuidv1 = require('uuid/v1');

export default {
  data: () => ({
    newNote: ""
  }),
  computed: {
    notes() {
      return this.$store.getters.notes;
    }
  },
  methods: {
    addNote() {
      if (this.newNote !== "") {
        var note = {
          text: this.newNote,
          lastUpdated: Date.now(),
          id: uuidv1()
        };
        this.$store.dispatch("ADD_NOTE", { note });
        this.newNote = "";
      }
    },
    editNote(id, value) {
      var note = {
        text: value,
        lastUpdated: Date.now(),
        id: id
      };
      this.$store.dispatch("EDIT_NOTE", { note });
    },
    deleteNote(id) {
      this.$store.dispatch("DELETE_NOTE", { id });
    }
  },
  watch: {
    notes: {
      handler() {
        console.log("Notes changed!");
        localStorage.setItem("notes", JSON.stringify(this.notes));
      },
      deep: true
    }
  },
};
</script>
