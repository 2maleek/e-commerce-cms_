<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="submit">
                  <v-text-field
                    label="Name"
                    type="text"
                    v-model="name"
                  />

                  <v-text-field
                    label="Email"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    label="Password"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit" @click="signUp">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Register',
  props: {
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    signUp() {
      console.log('kepincit Register')
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('signUp', payload)
    }
  },
};
</script>
