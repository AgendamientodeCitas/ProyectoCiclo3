<template>
  <v-app>
    <header v-if = "!['Admin','Agenda','Documento','Estado','Rol','Usuarios'].includes($route.name)">
      <The-navigation />
    </header>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';

export default {
  components: { TheNavigation },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
