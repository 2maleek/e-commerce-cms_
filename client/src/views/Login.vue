<template>
  <v-app id="inspire" class="mainContainer">
    <v-content>
      <h1 class="text-center header">E-Commerce CMS</h1>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Admin Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit="signIn" id="signIn-form">
                  <v-text-field label="Email" type="email" v-model="email" />

                  <v-text-field label="Password" type="password" v-model="password" />
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
import axios from "axios";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    signIn() {
      const payload = {
        email: this.email,
        password: this.password
      };
      axios({
        method: "post",
        url: "/login",
        data: payload
      })
        .then(response => {
          alertify.success("Sign in successfully");
          localStorage.setItem("access_token", response.data.access_token);
          this.$router.push("/");
        })
        .catch(err => {
          alertify.error(err.response.data.message);
        });
    }
  }
};
</script>

<style  scoped>
.mainContainer {
  background-image: url("https://bsp.brightspotcdn.com/dims4/default/1610848/2147483647/strip/true/crop/640x362+0+0/resize/767x434!/quality/90/?url=http%3A%2F%2Fbrightspot-brightspot.s3.amazonaws.com%2Fbsp%2F6a%2F2c%2F85da4f014d05859dec094976e108%2Fheadles-promo-mobile-bkgd-dark.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.header {
  color: azure;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin-top: 10vh;
  text-align: center;
}
</style>