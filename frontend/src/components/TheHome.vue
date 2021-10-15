<template>
    <v-card height="415px" elevation="8">
        <v-container>
            <v-row class="text-center">
                <v-col cols="12">
                    <v-img
                        :src="require('../assets/logo.jpeg')"
                        class="my-3"
                        contain
                        height="200"
                    />
                </v-col>

                <v-col class="mb-4">
                    <h1 class="display-2 font-weight-bold mb-3">
                        Bienvenidos al Agendamiento de Citas
                    </h1>

                    <p class="subheading font-weight-regular">
                        Dentro del marco del ciclo 3 del diplomado en
                        programación del ministerio de las Tic ruta2/UTP, como
                        requisito para culminar este ciclo, y como ejercicio
                        formativo, se ha venido desarollando esta página web
                        sobre agendamiento de citas; y hemos querido compartir
                        nuestros avances con todos los interesados.
                    </p>
                    <p class="subheading font-weight-regular">
                        Como pueden ver todavía es una página en construcción
                        pero donde hemos puesto todo nuestro empeño.
                        <!-- <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a> -->
                    </p>
                </v-col>
            </v-row>
        </v-container>

        <v-row align="center" justify="center" class="ma-12">
            <v-col cols="12" md="8"> </v-col>
        </v-row>
        <v-footer v-bind="localAttrs" :padless="padless">
            <v-card flat tile width="100%" class="blue lighten-1 text-center">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} —
                    <strong>Misión Tic 2022 Ruta 2</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-card>
</template>
<script>
export default {
    name: "TheHome",
    data: () => ({
        icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
        padless: true,
        variant: "fixed",
    }),
    computed: {
        localAttrs() {
            const attrs = {};
            attrs.fixed = true;
            return attrs;
        },
    },
};
</script>
