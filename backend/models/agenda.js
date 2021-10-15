const mongoose = require('mongoose');
const { Schema } = mongoose;

const agendaSchema = new Schema({
    idusuario: {
        type : Schema.ObjectId, ref: 'usuario'
    },    
    idmedico: {
        type : Schema.ObjectId, ref: 'usuario'
    },
    fechacita: {
        type : Date,
        required : true,
        default : Date.now
    },
    codigoestado: {
        type : Number,
        default : 1
    },
    createAt: {
        type : Date, 
        default : Date.now
    }
});

agendaSchema.index({ 
    idusuario: 1, 
    idmedico: 1, 
    fechacita: 1
    }, 
    { 
    unique: true 
    }
);

const Agenda = mongoose.model('agenda',agendaSchema);

module.exports = Agenda;
