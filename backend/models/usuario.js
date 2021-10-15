const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxLength:100
    },
    correo: {
        type: String,
        required : [true,'Correo Electronico obligatorio'],
        maxLength :100,
        unique : true, 
        lowercase : true,
        trim : true,
        validate : [validateEmail, 'Por favor ingrese un correo valido'],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un correo valido']
    },
    password: {
        type : String,
        required : [true,'Password obligatorio'],
        maxLength : 100,
    },
    codigorol: {
        // type : Schema.ObjectId, ref: 'rol'
        type : String,
        required : [true,'Codigo Rol obligatorio'],
        maxLength : 25,
        enum : ['Administrador','Medico','Paciente']        
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

const Usuario = mongoose.model('usuario',usuarioSchema);

module.exports = Usuario;
