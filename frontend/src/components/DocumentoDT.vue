<template>
    <v-container>
        <h1>
            Tipo de Documento
        </h1>
        <v-data-table
            :headers="headers"
            :items="documento"
            sort-by="_id"
            class="elevation-5"
            :loading="cargando"
            loading-text="Cargando ... Por favor espere"
        >
            <template v-slot:top>
                <v-toolbar flat color="purple lighten-1">
                    <v-toolbar-title>CRUD</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="deep-purple darken-3"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Agregar Tipo Documento
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                required
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'Tipo documento es requerido',
                                                ]"
                                                v-model="editedItem.tipodocumento"
                                                label="Tipo Documento"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.descripdocumento"
                                                label="Descripcion"
                                                required
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'Descripcion es requerida',
                                                ]"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="save">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5"
                                >Esta seguro de eliminar el Documento?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancelar</v-btn
                                >
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small class="mr-2" @click="ChangeStateItem(item)">
                    mdi-account-reactivate
                </v-icon>                
                <v-icon small class="mr-2" @click="deleteItem(item)">
                    mdi-delete-alert-outline
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    name: 'DocumentoDT',
    data: () => ({
        cargando: true,
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: "ID", value: "_id" },
            {
                text: "Tipo Documento",
                align: "start",
                sortable: false,
                value: "tipodocumento",
            },
            { text: "Descripcion", value: "descripdocumento" },
            { text: "Estado", value: "codigoestado" },
            { text: "Acciones", value: "actions", sortable: false },
        ],
        documento: [],
        editedIndex: -1,
        editedItem: {
            _id: "",
            tipodocumento: "",
            descripdocumento: "",
        },
        defaultItem: {
            _id: "",
            tipodocumento: "",
            descripdocumento: "",         
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1
                ? "Nuevo Documento"
                : "Editando Documento";
        },
        documentoCheck() {
            return this.editedIndex === -1 ? false : true;
        },
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },

    created() {
        this.list();
    },

    methods: {
        initialize() {},
        list() {
            axios
                .get("http://localhost:3000/api/documento/list")
                .then((response) => {
                    this.documento = response.data;
                    this.cargando = false;
                    // console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        editItem(item) {
            this.editedIndex = this.documento.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.documento.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        deleteItemConfirm(){         
            axios.delete('http://localhost:3000/api/documento/remove', {
                data: {
                  _id: this.editedItem._id,
                }              
            })
            .then(response => {
                      this.list();
                        // console.log(response);
                    })
            .catch(error => {
                console.log(error);
            });
            this.closeDelete();
        },
        ChangeStateItem(item) {
            this.editedIndex = this.documento.indexOf(item);
            this.editedItem = Object.assign({}, item);
            if (this.editedItem.codigoestado === 1){
              //disabled
                axios.put("http://localhost:3000/api/documento/disabled", {
                  _id: this.editedItem._id,              
            })
            .then(response => {
                      this.list()
                        // console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }else{
              //enabled
              axios.put("http://localhost:3000/api/documento/enabled", {
                  _id: this.editedItem._id,              
            })
            .then(response => {
                      this.list()
                        // console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                // Object.assign(this.usuarios[this.editedIndex], this.editedItem);
                axios
                    .put("http://localhost:3000/api/documento/update", {
                        _id: this.editedItem._id,
                        tipodocumento: this.editedItem.tipodocumento,
                        descripdocumento: this.editedItem.descripdocumento,
                    })
                    .then(response => {
                      this.list()
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                // this.usuarios.push(this.editedItem);
                axios
                    .post("http://localhost:3000/api/documento/add", {
                        tipodocumento: this.editedItem.tipodocumento,
                        descripdocumento: this.editedItem.descripdocumento,
                    })
                    .then(response => {
                      this.list()
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
            this.close();
        },
    },
};
</script>
