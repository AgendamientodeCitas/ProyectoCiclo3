const models = require('../models')
const { default: axios } = require('axios');
const token = require('../services/token');
//publicos
module.exports = {
    add : async (req, res, next) => {
        try {
            let checkRol = await models.Rol.findOne({
                codigorol : req.body.codigorol
            })
            if (!checkRol) {
                const reg = await models.Rol.create(req.body)
                res.status(200).json(reg);
            } else {
                res.status(404).send({
                    message: 'El codigo de Rol - ' + req.body.codigorol + ' - ya existe en el sistema!!',
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
            const reg = await models.Rol.find({}).sort({codigorol : 1});
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
            const reg = await models.Rol.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 1});
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
            const reg = await models.Rol.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 0});
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
            const reg = await models.Rol.updateOne({ _id : req.body._id },
                {
                    codigorol : req.body.codigorol,
                    descriprol : req.body.descriprol
                }); 
                res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
    remove : async(req, res, next) => {
        try {
            // obtener el usuario a actualizar en la BD
            const reg = await models.Rol.findByIdAndRemove({ _id : req.body._id }); 
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
}