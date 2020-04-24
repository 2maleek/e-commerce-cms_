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
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit="signIn" id="signIn-form">
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
                <v-btn color="primary" type="submit" @click="signIn">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  props: {
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    signIn() {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios({
        method: 'post',
        url: '/login',
        data: payload,
      })
      .then(response => {
        alertify.success('Sign in successfully')
        localStorage.setItem('access_token', response.data.access_token)
        this.$router.push('/')
      })
      .catch(err => {
        alertify.error(err.response.data.message)
      })
    },
  },
};
</script>
