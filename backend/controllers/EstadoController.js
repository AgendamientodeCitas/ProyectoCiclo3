const models = require('../models')
const { default: axios } = require('axios');
const token = require('../services/token');
//publicos
module.exports = {
    add : async (req, res, next) => {
        try {
            let checkEstado = await models.Estado.findOne({
                codigoestado : req.body.codigoestado
            })
            if (!checkEstado) {
                const reg = await models.Estado.create(req.body)
                res.status(200).json(reg);
            } else {
                res.status(404).send({
                    message: 'El estado - ' + req.body.codigoestado + ' - ya existe en el sistema!!',
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
            const reg = await models.Estado.find({}).sort({codigoestado : 1});
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
            const reg = await models.Estado.updateOne({ _id : req.body._id },
                {
                    codigoestado : req.body.codigoestado,
                    descripestado : req.body.descripestado
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
            const reg = await models.Estado.findByIdAndRemove({ _id : req.body._id }); 
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
}