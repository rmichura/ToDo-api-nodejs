<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row class="justify-center ma-16">
        <v-sheet
          elevation="8"
          height="400"
          width="600"
        >
          <v-col class="emailMargin">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              @click:append="show = !show"
              @keyup.enter="loginUser"
            ></v-text-field>
            <v-row class="justify-center">
              If you haven't account, register here
              <router-link to="/register">click me</router-link>
            </v-row>
            <v-row class="justify-center ma-16">
              <v-btn
                color="primary"
                elevation="7"
                large
                @click="loginUser"
                :disabled="!valid"
              >Sign In
              </v-btn>
            </v-row>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import router from "@/router";

export default {
  name: 'SignIn',

  data() {
    return {
      show: false,
      email: '',
      password: '',
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
        // at:
      }
    }
  },
  methods: {
    async loginUser() {
      if (this.email !== '') {
        this.$refs.form.validate()
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        if (localStorage.getItem('token')) {
          this.goTo()
        } else {
          alert('We dont have such account')
        }
      } else {
        alert('Something went wrong')
      }
    },
    goTo() {
      router.push('/user/todo')
    }
  },
}
</script>

<style>

.emailMargin {
  margin-top: 3em;
}

</style>
