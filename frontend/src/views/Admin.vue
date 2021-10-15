<template>

  <v-card class="mx-auto overflow-hidden" height="100%">
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Administración</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="salir">
        <span class="mr-2">Salir</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container>
      <div class="about">
        <h1>Admistracion del sistema</h1>
        MINTIC 2022
      </div>
    </v-container>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item exact :to="{ name: 'Home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item exact :to="{ name: 'Admin'}">
            <v-list-item-icon>
              <v-icon>mdi-key</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="isAdmin"
            :to="{ name: 'Usuarios'}">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Agenda'}">
            <v-list-item-icon>
              <v-icon>mdi-lightbulb-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Agenda</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Documento'}">
            <v-list-item-icon>
              <v-icon>mdi-card-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Documento</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Estado'}">
            <v-list-item-icon>
              <v-icon>mdi-power-socket</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Estado</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ name: 'Rol'}">
            <v-list-item-icon>
              <v-icon>mdi-account-switch</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Rol</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>

      <section class="mt-6"
        v-show="['Admin'].includes($route.name)"
      >
        <welcome-admin />
      </section>

      <router-view />

    </v-main>
  </v-card>

</template>

<script>
import decode from "jwt-decode";
import WelcomeAdmin from '../components/WelcomeAdmin.vue';

export default {
  components: { WelcomeAdmin },
    name : 'Admin',
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    isAdmin() {
      let token = decode(localStorage.getItem("token"));
      return token.codigorol === "Administrador" ? true : false;
    },
  },
  methods: {
    salir() {
      localStorage.removeItem("token");
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
