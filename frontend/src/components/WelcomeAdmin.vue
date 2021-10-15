<template>
  <v-card
    class="mx-auto"
    color="#814E97"
    dark
    max-width="400"
  >

    <v-card-text class="text-h5 font-weight-bold">
        Bienvenido al sistema {{ bienvenido.nombre }}
        {{ bienvenido.codigorol }}
    </v-card-text>

  </v-card>
</template>

<script>

import decode from 'jwt-decode'

  export default {
      name : 'WelcomeAdmin',
    data: () => ({
        objeto : ''
      //
    }),
    computed: {
        bienvenido(){
            let token = decode(localStorage.getItem('token'));
            return token;
        }
    }
  }
</script>