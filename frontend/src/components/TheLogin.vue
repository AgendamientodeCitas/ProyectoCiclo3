<template>
    <v-card height="400px" elevation="8">
        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="correo"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="ingrese su Contraseña"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="ingresar"
                >
                    Ingresar
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset">
                    Reset Form
                </v-btn>
            </v-form>
        </v-container>
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
import axios from "axios";
export default {
    name: "TheLogin",
    data: () => ({
        icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
        padless: true,
        variant: "fixed",
        valid: true,
        show1: false,
        password: "",
        correo: "",
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
    }),
    computed: {
        localAttrs() {
            const attrs = {};
            attrs.fixed = true;
            return attrs;
        },
    },
    methods: {
        ingresar() {
            axios
                .post("http://localhost:3000/api/usuario/login", {
                    correo: this.correo,
                    password: this.password,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.tokenReturn);
                    this.$router.push({ name: "Admin" });
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>
