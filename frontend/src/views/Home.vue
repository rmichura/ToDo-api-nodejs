<template>
  <v-container class="margin-top">
    <v-row class="justify-center">
      <span>Welcome to the ToDo app</span>
    </v-row>
    <v-row class="justify-center">
      <v-btn
        color="primary"
        elevation="7"
        large
        v-if="!auth"
        @click="toSignIn"
      >
        Get started
        <v-icon
          class="ma-1"
        >
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";

export default {
  name: "Main",
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    }
  },
  methods: {
    toSignIn() {
      router.push('/login')
    },
  }
}
</script>

<style scoped>
span {
  text-align: center;
  font-size: 50px;
  margin-top: 4em;
  margin-bottom: 1em;
}
</style>
