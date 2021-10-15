<template>
  <v-container>
      <v-row justify="center">

            </v-row>
       <the-login /> 
      </v-container>

  <!-- <v-row class="text-center">
    <v-container>
      <h1>
        Login
      </h1>

    </v-container>
  </v-row> -->
</template>

<script>
import TheLogin from "../components/TheLogin.vue";
export default {
  components: { TheLogin },
  name: "Login",
  beforeCreate() {
    if (localStorage.getItem("token")) {
      this.$router.push({
        name: "Admin",
      });
    }
  },
};
</script>
