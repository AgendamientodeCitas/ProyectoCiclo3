<template>
    <v-card height="400px" elevation="8">
        <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="nombre"
                    :counter="100"
                    :rules="nameRules"
                    label="Nombre"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="correo"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-select
                    v-model="codigorol"
                    :items="items"
                    :rules="[(v) => !!v || 'Item Requerido']"
                    label="Rol"
                    required
                ></v-select>
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
                    @click="save"
                >
                    Guardar
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
    data: () => ({
        show1: false,
        nombre:"",
        password: "",
        correo: "",
        codigorol: "",
        icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
        padless: true,
        variant: "fixed",
        valid: true,
        name: "",
        nameRules: [
            (v) => !!v || "Name is required",
            (v) =>
                (v && v.length <= 100) ||
                "El nombre debe tener menos de 100 caracteres",
        ],
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        select: null,
        items: ["Medico", "Paciente"],
    }),
    computed: {
        localAttrs() {
            const attrs = {};
            attrs.fixed = true;
            return attrs;
        },
    },
    methods: {
        save() {
            axios
                .post("http://localhost:3000/api/usuario/add", {
                    nombre: this.nombre,
                    correo: this.correo,
                    password: this.password,
                    codigorol: this.codigorol,
                })
                .then((response) => {
                    // this.list();
                    this.reset(),
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        validate() {
            this.$refs.form.validate();
        },
        reset() {
            this.$refs.form.reset();
        },
        resetValidation() {
            this.$refs.form.resetValidation();
        },
    },
};
</script>
