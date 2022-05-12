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
            v-bind:class="task.done ? 'text-decoration-line-through' : 'text-decoration-line-through-off'"
            class="col-6 text-truncate"
          >
            {{ task.text }}
          </v-card-text>
          <v-row>
            <v-spacer></v-spacer>

            <template v-if="$vuetify.breakpoint.width < 600">
              <v-btn
                class="button"
                small
                color="primary"
                @click="openDrawer(index)"
              >
                <v-icon>mdi-menu</v-icon>
              </v-btn>

              <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
              >
                <v-list-item>
                  <v-btn
                    small
                    class="button-drawer"
                    color="primary"
                    @click="doneTask(index)"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <editing-task :name='task.text' :can-edit='task.done' :indexTask="index" class="button-edit"/>
                  <v-btn
                    small
                    class="button-drawer"
                    color="red"
                    @click="removeTask(index)"
                  >
                    <v-icon
                      color="white"
                    >mdi-delete
                    </v-icon>
                  </v-btn>
                </v-list-item>
              </v-navigation-drawer>
            </template>


            <template v-else>
              <v-btn
                small
                class="button"
                color="primary"
                @click="doneTask(index)"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <editing-task :name='task.text' :can-edit='task.done'/>
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
            </template>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import EditingTask from "@/components/EditingTask";

export default {
  name: "Dashboard",
  components: {EditingTask},
  watch: {
    group () {
      this.drawer = false
    },
  },
  data() {
    return {
      task: '',
      done: false,
      canEdit: true,
      drawer: null,
      group: null
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
    async doneTask(id) {
      await this.$store.dispatch('doneTask', [id, {
        done: true,
      }])
      this.canEdit = false
    },

    openDrawer(index) {
      this.drawer = !this.drawer
      console.log(index)
    },

    async addTask() {
      if (this.task !== '') {
        await this.$store.dispatch('saveTask', {
          user: this.$store.state.userId,
          text: this.task,
          done: this.done
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

.button-edit {
  margin-top: 4.5em;
  margin-left: 2em;
}

.button-drawer {
  margin-left: 1em;
}

</style>
