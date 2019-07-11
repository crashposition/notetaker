<template>
  <v-container>
    <v-text-field v-model="newNote" label="Enter your note" @keydown.enter="addNote"></v-text-field>
    <h2>Notes</h2>

    <v-card>
      <v-list>
        <template v-for="(note, index) in notes">
          <v-list-tile :key="index">
            <v-text-field :value="note.text" @keydown.enter="editNote(index, $event.target.value)"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn fab small outline color="red" @click="deleteNote(index)">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
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
          lastUpdated: Date.now()
        };
        this.$store.dispatch("ADD_NOTE", { note });
        this.newNote = "";
      }
    },
    editNote(index, value) {
      var note = {
        text: value,
        lastUpdated: Date.now()
      };
      this.$store.dispatch("EDIT_NOTE", { note, index });
    },
    deleteNote(index) {
      this.$store.dispatch("DELETE_NOTE", { index });
    }
  }
};
</script>
