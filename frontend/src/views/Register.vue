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
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirm ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              name="input-10-1"
              label="Confirm Password"
              hint="At least 8 characters"
              @click:append="showConfirm = !showConfirm"
              @keyup.enter="creatUser"
            ></v-text-field>
            <v-row class="justify-center ma-10">
              <v-btn
                color="primary"
                elevation="7"
                large
                @click="creatUser"
                :disabled="!valid"
              >Sign Up
              </v-btn>
            </v-row>
          </v-col>
        </v-sheet>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import router from "@/router"

export default {
  name: 'Register',

  data() {
    return {
      show: false,
      showConfirm: false,
      email: '',
      password: '',
      confirmPassword: '',
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },
  methods: {
    async creatUser() {
      if (this.email !== '' && this.password === this.confirmPassword) {
        this.$refs.form.validate()
        await this.$store.dispatch('register', {
          email: this.email,
          password: this.password
        })
        this.goToLogin()
      } else {
        alert('Something went wrong')
      }
    },
    goToLogin() {
      router.push('/login')
    }
  },
}
</script>

<style scoped>

</style>
