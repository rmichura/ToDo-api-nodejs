<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        cols="6"
        class="margin-top"
      >
        <v-row>
          <v-text-field
            elevation="8"
            label="Type your task"
            v-model="task"
            @keyup.enter="addTask"
          >

          </v-text-field>
          <v-btn
            large
            rounded
            class="ma-2"
            elevation="6"
            color="primary"
            v-if="getTask"
            @click="addTask"
          >
            Add
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col
        cols="8">
        <v-card
          class="margin-between-tasks"
          color="silver"
          height="50"
          elevation="8"
          v-for="(task, index) in tasks" :key="index"
        >
          <v-card-text
            v-bind:class="show ? 'text-decoration-line-through' : 'text-decoration-line-through-off'"
          >
            {{ task.text }}
          </v-card-text>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn
              class="button"
              small
              color="primary"
              @click="doneTask"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              class="button"
              small
              color="green"
            >
              <v-icon
                color="white"
              >mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              class="button"
              small
              color="red"
              @click="removeTask(index)"
            >
              <v-icon
                color="white"
              >mdi-delete
              </v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      show: false,
      task: '',
    }
  },
  computed: {
    ...mapGetters({
      tasks: "getAllTasks",
    }),
    getTask() {
      return this.$store.dispatch('getTasks')
    },
  },
  methods: {
    doneTask() {
      this.show = true
    },
    async addTask() {
      if (this.task !== '') {
        await this.$store.dispatch('saveTask', {
          text: this.task
        })
        this.tasks.push({
          text: this.task
        })
        this.task = ''
        this.$router.go(0)
      } else {
        alert('Task is required')
      }
    },
    async removeTask(id) {
      if (id >= 0) {
        await this.$store.dispatch('removeTask', id)
      }
    }
  }
}
</script>

<style scoped>
.margin-top {
  margin-top: 4em;
}

.button {
  margin-top: -2.5em;
  margin-right: 1.5em;
}

.margin-between-tasks {
  margin-top: 2em;
}


</style>
