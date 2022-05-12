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
          <span>Home</span>
        </v-btn>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <router-link to="/login">
      <v-btn
        text
        v-if="!auth"
      >
        <span>Sign In</span>
      </v-btn>
    </router-link>

    <router-link to="/register">
      <v-btn
        text
        v-if="!auth"
      >
        <span>Sign Up</span>
      </v-btn>
    </router-link>

    <router-link to="/user/todo">
      <v-btn
        text
        v-if="auth"
      >
        <span>Todo</span>
      </v-btn>
    </router-link>

    <router-link to="/user/profile">
      <v-btn
        text
        v-if="auth"
      >
        <span>My profile</span>
      </v-btn>
    </router-link>

    <router-link to="/">
      <v-btn
        text
        v-if="auth"
        @click="logOut"
      >
        <span>Log out</span>
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
