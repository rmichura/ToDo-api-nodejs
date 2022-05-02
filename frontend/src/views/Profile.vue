<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-container>
      <v-row
      >
        <v-col
          cols="4"
          class="margin-top"
        >
          <v-card
            elevation="8"
            color="primary"
            min-height="500"
          >
            <v-row class="justify-center">
              <v-icon
                class="margin-top-icon"
                size="80"
                color="white"
              >mdi-account
              </v-icon>
            </v-row>
            <v-text-field
              class="ma-10"
              v-model="email"
              dark
              v-if="getEmail"
              disabled
              label="Email"
            ></v-text-field>
            <v-col>
            </v-col>
          </v-card>
        </v-col>
        <v-col
          cols="8"
          class="margin-top"
        >
          <v-card
            color="gray"
            min-height="500"
            elevation="8"
          >
            <v-row>
              <v-col class="ma-4">
                <v-text-field
                  label="Name"
                  v-model="name"
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  v-model="lastName"
                ></v-text-field>
                <v-text-field
                  label="Address"
                  v-model="address"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  :rules="[rules.required, rules.min]"
                  name="input-10-1"
                  label="New Password"
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
                  @keyup.enter="editUser"
                ></v-text-field>
                <v-row class="justify-center ma-6">
                  <v-btn
                    large
                    color="primary"
                    elevation="8"
                    @click="editUser"
                    :disabled="!valid"
                  >
                    Save it
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>

import router from "@/router";

export default {
  name: "Profile",
  data() {
    return {
      email: '',
      show: false,
      showConfirm: false,
      name: '',
      lastName: '',
      address: '',
      password: '',
      confirmPassword: '',
      valid: true,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters'
      }
    }
  },

  computed: {
    getEmail() {
      this.setEmail()
      return this.$store.dispatch('getEmail')
    },
  },
  methods: {
    setEmail() {
      this.email = this.$store.state.emailUser
    },

    async editUser() {
      if (this.name !== '' || this.lastName !== '' || this.address !== '') {
        this.$refs.form.validate()
        if (this.password === this.confirmPassword && this.password !== '') {
          await this.$store.dispatch('editAccount', {
            name: this.name,
            lastName: this.lastName,
            address: this.address,
            password: this.password
          })
          this.goToHome()
        }
      } else {
        alert('Something went wrong')
      }
    },
    goToHome() {
      router.push('/')
    }
  }
}
</script>

<style scoped>
.margin-top {
  margin-top: 4em;
}

.margin-top-icon {
  margin-top: 1em;
}

</style>
