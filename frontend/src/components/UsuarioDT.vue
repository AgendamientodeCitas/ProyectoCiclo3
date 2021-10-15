<template>
  <v-container>
    <h1>
      Usuarios
    </h1>
    <v-data-table
      :headers="headers"
      :items="usuarios"
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
                Agregar Usuario
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        required
                        :counter="50"
                        :rules="[(v) => !!v || 'Nombre es requerido']"
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="!correoCheck" cols="12">
                      <v-text-field
                        :rules="emailRules"
                        v-model="editedItem.correo"
                        label="Correo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.codigorol"
                        :items="roles"
                        :rules="[(v) => !!v || 'Rol es requerido']"
                        label="Rol"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Contraseña"
                        required
                        :rules="[(v) => !!v || 'Contraseña es requerida']"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
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
                >Esta seguro de editar el estado?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
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
        <v-icon small class="mr-2" @click="deleteItem(item)">
          <template v-if="item.codigoestado">
            mdi-toggle-switch
            </template>
            <template v-else>
              mdi-toggle-switch-off-outline
            </template> 
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
  name: "UsuarioDT",
  data: () => ({
    cargando: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "_id" },
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Correo", value: "correo" },
      // { text: "Password", value: "password" },
      { text: "Rol", value: "codigorol" },
      { text: "Estado", value: "codigoestado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usuarios: [],
    roles: ["Administrador", "Medico", "Paciente"],
    emailRules: [
      (v) => !!v || "E-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    editedIndex: -1,
    editedItem: {
      _id: "",
      nombre: "",
      correo: "",
      password: "",
      codigorol: "",
    },
    defaultItem: {
      _id: "",
      nombre: "",
      correo: "",
      password: "",
      codigorol: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editando Usuario";
    },
    correoCheck() {
      return this.editedIndex === -1 ? false : true;
    },
    localToken() { 
      return localStorage.getItem('token');
      }
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
        .get("http://localhost:3000/api/usuario/list", { headers : {
          token : this.localToken
        }})
        .then((response) => {
          this.usuarios = response.data;
          this.cargando = false;
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      if (this.editedItem.codigoestado === 1) {
        //disabled
        axios
          .put("http://localhost:3000/api/usuario/disabled", {
            _id: this.editedItem._id,
          })
          .then((response) => {
            this.list();
            // console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //enabled
        axios
          .put("http://localhost:3000/api/usuario/enabled", {
            _id: this.editedItem._id,
          })
          .then((response) => {
            this.list();
            // console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // this.usuarios.splice(this.editedIndex, 1);
      this.closeDelete();
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
          .put("http://localhost:3000/api/usuario/update", {
            nombre: this.editedItem.nombre,
            correo: this.editedItem.correo,
            password: this.editedItem.password,
            codigorol: this.editedItem.codigorol,
          })
          .then((response) => {
            this.list();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // this.usuarios.push(this.editedItem);
        axios
          .post("http://localhost:3000/api/usuario/add", {
            nombre: this.editedItem.nombre,
            correo: this.editedItem.correo,
            password: this.editedItem.password,
            codigorol: this.editedItem.codigorol,
          })
          .then((response) => {
            this.list();
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.close();
    },
  },
};
</script>
