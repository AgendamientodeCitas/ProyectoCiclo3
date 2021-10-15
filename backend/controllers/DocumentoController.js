const models = require('../models')
const { default: axios } = require('axios');
const token = require('../services/token');
//publicos
module.exports = {
    add : async (req, res, next) => {
        try {
            let checkDocumento = await models.Documento.findOne({
                tipodocumento : req.body.tipodocumento
            })
            if (!checkDocumento) {
                const reg = await models.Documento.create(req.body)
                res.status(200).json(reg);
            } else {
                res.status(404).send({
                    message: 'El tipo de documento - ' + req.body.tipodocumento + ' - ya existe en el sistema!!',
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
            const reg = await models.Documento.find({}).sort({tipodocumento : 1});
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
            const reg = await models.Documento.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 1});
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
            const reg = await models.Documento.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 0});
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
            const reg = await models.Documento.updateOne({ _id : req.body._id },
                {
                    tipodocumento : req.body.tipodocumento,
                    descripdocumento : req.body.descripdocumento
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
            const reg = await models.Documento.findByIdAndRemove({ _id : req.body._id }); 
            res.status(200).json(reg);

        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
}