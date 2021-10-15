const models = require('../models')
const bcrypt = require('bcryptjs');
const { default: axios } = require('axios');
const token = require('../services/token');
//publicos
module.exports = {
    add : async (req, res, next) => {
        try {
            let checkUser = await models.Usuario.findOne({
                correo : req.body.correo
            })
            if (!checkUser) {
                req.body.password = await bcrypt.hash(req.body.password,10);
                const reg = await models.Usuario.create(req.body)
                res.status(200).json(reg);
            } else {
                res.status(404).send({
                    message: 'El correo ya existe en el sistema!!',
                })
            }

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
    list: async (req, res, next) => {
        try {
            const reg = await models.Usuario.find({}).sort({codigorol : 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        } 
    },
    listPaciente: async (req, res, next) => {
        try {
            const reg = await models.Usuario.find({codigorol: 'Paciente'}).sort({codigoestado : -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        } 
    },
    listMedico: async (req, res, next) => {
        try {
            const reg = await models.Usuario.find({codigorol: 'Medico'}).sort({codigoestado : -1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        } 
    },
    enabled : async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 1});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },

    disabled : async(req, res, next) => {
        try {
            const reg = await models.Usuario.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 0});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },

    update : async(req, res, next) => {
        try {
            // obtener el usuario a actualizar en la BD
            let auxPassword = req.body.password
            const auxReg = await models.Usuario.findOne({ correo : req.body.correo })
            if(auxReg){
                if(auxPassword !== auxReg.password ){
                    req.body.password = await bcrypt.hash(req.body.password,10);
                }
                const reg = await models.Usuario.updateOne({ correo : req.body.correo},{
                    nombre : req.body.nombre,
                    codigorol : req.body.codigorol,
                    password : req.body.password
                });
                res.status(200).json(reg);
            }else{
                res.status(404).send({ message: 'Usuario no Registrado'})
            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }

    },

        login : async(req, res, next) => {
        try {
            let checkUser = await models.Usuario.findOne({
                correo : req.body.correo,
                codigoestado : 1
            })
            if(checkUser){
                let match = await bcrypt.compare(req.body.password, checkUser.password)
                if (match){
                    let tokenReturn = await token.encode(checkUser);
                    res.status(200).json({
                        checkUser,
                        tokenReturn
                    })
                }else{
                    res.status(401).send({
                        message: 'Contraseña incorrecta!',
                    });
                    next(error);
                }
            }else{
                res.status(404).send({
                    message: 'Usuario no registrado!',
                });
                next(error);

            }
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    }
}
/* 
login(){
    axios.post('http://localhost:3000/api/usuario/login',{
        correo : this.correo,
        password : this.password
    })
    .then(
        console.log('Exito')

    )
    .catch(
        console.log('Error')

    )
}
 */
