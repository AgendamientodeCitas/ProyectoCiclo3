const mongoose = require('mongoose');
const { Schema } = mongoose;

const rolSchema = new Schema({
    codigorol: {
        type : Number,
        required : [true,'Codigo Rol obligatorio'],
        unique : true
    },
    descriprol: {
        type : String,
        required : [true,'Descripcion Rol obligatorio'],
        maxLength : 100,
        lowercase : true,
        default : 'Paciente'
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

const Rol = mongoose.model('rol',rolSchema);

module.exports = Rol;
