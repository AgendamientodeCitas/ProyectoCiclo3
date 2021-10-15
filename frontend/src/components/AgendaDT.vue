<template>
  <v-container>
    <h1>Agendas</h1>
    <v-data-table
      :headers="headers"
      :items="agenda"
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
                Agregar Agenda
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
                                            <v-select
                                                item-text="nombre"
                                                item-value="_id"
                                                v-model="editedItem.idusuario"
                                                :items="pacientes"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'Paciente is required',
                                                ]"
                                                label="Paciente"
                                                required
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                item-text="nombre"
                                                item-value="_id"
                                                v-model="editedItem.idmedico"
                                                :items="medicos"
                                                :rules="[
                                                    (v) =>
                                                        !!v ||
                                                        'Medico is required',
                                                ]"
                                                label="Medico"
                                                required
                                            ></v-select>
                                        </v-col>




                    <!-- <v-col cols="12">
                      <v-text-field
                        required
                        :rules="[(v) => !!v || 'IdUsuario es requerido']"
                        v-model="editedItem.idusuario"
                        label="Id Usuario"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.idmedico"
                        label="Id Medico"
                        required
                        :rules="[(v) => !!v || 'IdMedico es requerido']"
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.fechacita"
                        label="Fecha Cita"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="11" sm="6" md="4">
                      <v-dialog
                        ref="dialogd"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="Fecha"
                            prepend-icon="mdi-calendar"
                            readonly
                            required
                            :rules="[(v) => !!v || 'Fecha cita es requerido']"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogd.save(date)"
                          >
                            Listo
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-spacer></v-spacer>
                    <v-col cols="11" sm="5">
                      <v-dialog
                        ref="dialogt"
                        v-model="modal2"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Hora"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            required
                            :rules="[(v) => !!v || 'La Hora es requerido']"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker v-if="modal2" v-model="time" full-width>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal2 = false">
                            Cancelar
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialogt.save(time)"
                          >
                            Guardar
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>

                    <v-col cols="12">
                      Prueba: {{ date }}T{{ time }}:00.001Z</v-col
                    >
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
                >Esta seguro de eliminar la agenda?</v-card-title
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small class="mr-2" @click="ChangeStateItem(item)">
          mdi-account-reactivate
        </v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">
          mdi-delete-alert-outline
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "agendaDT",
  data: () => ({
    time: null,
    menu2: false,
    modal2: false,
    time: null,
    // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //   .toISOString()
    //   .substr(0, 10),
    modal: false,
    cargando: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "_id" },
      {
        text: "Id Usuario",
        align: "start",
        sortable: false,
        value: "idusuario",
      },
      { text: "Id Medico", value: "idmedico" },
      { text: "Fecha Cita", value: "fechacita" },
      { text: "Estado", value: "codigoestado" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    agenda: [],
    pacientes: [],
    medicos: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      idusuario: "",
      idmedico: "",
      fechacita: "",
      date: null,
      time: null,
    },
    defaultItem: {
      _id: "",
      idusuario: "",
      idmedico: "",
      fechacita: "",
      date: null,
      time: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva agenda" : "Editando agenda";
    },
    rolCheck() {
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
        this.pacienteListar();
        this.medicoListar();    // this.initialize();
  },

  methods: {
    // initialize() {
    //   this.agenda = [
    //     {
    //       _id: "6165950d096db6e9e9cf406d",
    //       idusuario: "1",
    //       idmedico: "administrador",
    //       fechacita: "ddmmaa",
    //       codigoestado: "1",
    //     },
    //   ];
    // },
    list() {
      axios
        .get("http://localhost:3000/api/agenda/list")
        .then((response) => {
          this.agenda = response.data;
          this.cargando = false;
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

        pacienteListar() {
            axios
                .get("http://localhost:3000/api/usuario/listpaciente")
                .then((response) => {
                    this.pacientes = response.data;
                    // console.log(response);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    return error;
                });
        },
        medicoListar() {
            axios
                .get("http://localhost:3000/api/usuario/listmedico")
                .then((response) => {
                    this.medicos = response.data;
                    // console.log(response);
                })
                .catch(function(error) {
                    // handle error
                    console.log(error);
                    return error;
                });
        },

    editItem(item) {
      this.editedIndex = this.agenda.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.agenda.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      axios
        .delete("http://localhost:3000/api/agenda/remove", {
          data: {
            _id: this.editedItem._id,
          },
        })
        .then((response) => {
          this.list();
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.closeDelete();
    },
    ChangeStateItem(item) {
      this.editedIndex = this.agenda.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (this.editedItem.codigoestado === 1) {
        //disabled
        axios
          .put("http://localhost:3000/api/agenda/disabled", {
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
          .put("http://localhost:3000/api/agenda/enabled", {
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
        //AVERIGUAR COMO HACER QUE EL CAMPO ME COJA LA FECHA ELEJIDA
        // this.fechacita = this.date + 'T' + this.time + ':00.001Z';
        axios
          .put("http://localhost:3000/api/agenda/update", {
            _id: this.editedItem._id,
            idusuario: this.editedItem.idusuario,
            idmedico: this.editedItem.idmedico,
            fechacita: this.editedItem.fechacita,
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
          .post("http://localhost:3000/api/agenda/add", {
            idusuario: this.editedItem.idusuario,
            idmedico: this.editedItem.idmedico,
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
