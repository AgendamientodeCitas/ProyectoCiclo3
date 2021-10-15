<template>
    <v-card height="400 px" elevation="8">
        <v-container>
            <v-row class="text-center">
                <v-col>
                    <h1 class="display-2 font-weight-bold mb-3">
                        Equipo de desarrollo
                    </h1>
                </v-col>
            </v-row>
            <v-fade-transition mode="out-in">
                <v-row>
                    <v-col cols="3">
                        <v-card width="320" height="320" elevation="8">
                            <v-flex class="pa-10 pb-8 text-center">
                                <v-img
                                    class="mx-auto"
                                    :src="require('../assets/teem-1.png')"
                                    contain
                                    max-width="150"
                                    max-height="150"
                                ></v-img>
                                <v-card-title
                                    primary-title
                                    class="justify-center"
                                >
                                    Manuel Guancha
                                </v-card-title>
                                <v-card-subtitle>
                                    Responsable del Frontend y Backend
                                </v-card-subtitle>
                            </v-flex>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="320" height="320" elevation="8">
                            <v-flex class="pa-8 text-center">
                                <v-img
                                    class="mx-auto"
                                    :src="require('../assets/teem-2.png')"
                                    
                                    max-width="150"
                                    max-height="150"
                                ></v-img>
                                <v-card-title
                                    primary-title
                                    class="justify-center"
                                >
                                    Armando Romero
                                </v-card-title>
                                <v-card-subtitle>
                                    Apoyo de Frontend, Backend, redacción, y documentación
                                </v-card-subtitle>
                            </v-flex>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="320" height="320" elevation="8">
                            <v-flex class="pa-10 pb-8 text-center">
                                <v-img
                                    class="mx-auto"
                                    :src="require('../assets/teem-3.png')"
                                    contain
                                    max-width="150"
                                    max-height="150"
                                ></v-img>
                                <v-card-title
                                    primary-title
                                    class="justify-center"
                                >
                                   Karen Sanchez
                                </v-card-title>
                                <v-card-subtitle>
                                    Apoyo de Frontend y documentación
                                </v-card-subtitle>
                            </v-flex>
                        </v-card>
                    </v-col>
                    <v-col cols="3">
                        <v-card width="320" height="320" elevation="8">
                            <v-flex class="pa-10 pb-8 text-center">
                                <v-img
                                    class="mx-auto"
                                    :src="require('../assets/teem-4.png')"
                                    contain
                                    max-width="150"
                                    max-height="150"
                                ></v-img>
                                <v-card-title
                                    primary-title
                                    class="justify-center"
                                >
                                    Cristian Romero
                                </v-card-title>
                                <v-card-subtitle>
                                    Lider de documentación
                                </v-card-subtitle>
                            </v-flex>
                        </v-card>
                    </v-col>
                </v-row>
            </v-fade-transition>
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
