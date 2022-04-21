<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <div class="d-flex align-center">
      <router-link to="/">
        <v-btn
          text
        >
          <span class="mr-2">Home</span>
        </v-btn>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <router-link to="/login">
      <v-btn
        text
        v-if="!auth"
      >
        <span class="mr-2">Sign In</span>
      </v-btn>
    </router-link>

    <router-link to="/register">
      <v-btn
        text
        v-if="!auth"
      >
        <span class="mr-2">Sign Up</span>
      </v-btn>
    </router-link>

    <router-link to="/user/todo">
      <v-btn
        text
        v-if="auth"
      >
        <span class="mr-2">Todo</span>
      </v-btn>
    </router-link>

    <router-link to="/user/profile">
      <v-btn
        text
        v-if="auth"
      >
        <span class="mr-2">My profile</span>
      </v-btn>
    </router-link>

    <router-link to="/">
      <v-btn
        text
        v-if="auth"
        @click="logOut"
      >
        <span class="mr-2">Log out</span>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavigatorBar",

  computed: {
    auth() {
      return this.$store.getters.isAuth;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>

</style>
