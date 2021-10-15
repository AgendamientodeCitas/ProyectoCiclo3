const mongoose = require('mongoose');
const { Schema } = mongoose;

const estadoSchema = new Schema({
    codigoestado: {
        type : Number,
        required : [true,'Codigo Estado obligatorio'],
        unique : true,
        default : 1
    },
    descripestado: {
        type : String,
        required : [true,'Descripcion Estado obligatorio'],
        maxLength : 100,
        lowercase : true
    },
    createAt: {
        type : Date, 
        default : Date.now
    }
})

const Estado = mongoose.model('estado',estadoSchema);

module.exports = Estado;
