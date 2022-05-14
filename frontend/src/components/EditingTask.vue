<template>
  <v-dialog
    v-model="edit"
    persistent
    max-width="400"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="green"
        small
        :class="[$vuetify.breakpoint.width < 600 ? buttonDrawerClass : buttonClass]"
        :disabled="canEdit"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          color="white"
        >mdi-pencil
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-text-field
        class="margin-card"
        v-model="name"
      >
      </v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="edit = false"
        >
          Disagree
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="editedTask"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditingTask",
  props: ['name', 'canEdit', 'indexTask'],
  data() {
    return {
      edit: false,
      editTask: '',
      buttonClass: 'button',
      buttonDrawerClass: 'between-button',
    }
  },
  methods: {
    async editedTask() {
      let id = this.indexTask
      let newText = this.editTask = this.name
      if (newText !== '') {
        await this.$store.dispatch('editTask', [id, {
          text: newText
        }])
        this.edit = false
        this.$store.state.tasks[id].text = newText
      } else {
        alert('Type your task')
      }
    },
  },
}
</script>

<style scoped>
.button {
  margin-top: -2.5em;
  margin-right: 1.5em;
}

.margin-card {
  margin-right: 1em;
  margin-left: 1em;
  margin-bottom: -1em;
}

.between-button {
  margin-top: 1em;
  margin-left: 1em;
  width: 170px;
}

</style>
