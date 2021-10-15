const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentoSchema = new Schema({
    tipodocumento: {
        type : String,
        required : [true,'Tipo documento obligatorio'],
        maxLength : 2,
        uppercase : true,
        unique : true
    },
    descripdocumento: {
        type : String,
        required : [true,'Descripcion Documento obligatorio'],
        maxLength : 100,
        lowercase : true
    },
    codigoestado: {
        // type : Schema.ObjectId, ref: 'estado'
        type : Number,
        default : 1
    },
    createAt: {
        type : Date, 
        default : Date.now
    }
})

const Documento = mongoose.model('documento',documentoSchema);

module.exports = Documento;
