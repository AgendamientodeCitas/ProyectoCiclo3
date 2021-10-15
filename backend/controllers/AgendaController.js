const models = require('../models')
const bcrypt = require('bcryptjs');
const { default: axios } = require('axios');
const token = require('../services/token');
//publicos
module.exports = {
    add : async (req, res, next) => {
        try {
            let checkAgenda = await models.Agenda.findOne({
                idusuario : req.body.idusuario,
                idmedico : req.body.idmedico,
                fechacita : req.body.fechacita
            })
            if (!checkAgenda) {
                const reg = await models.Agenda.create(req.body)
                res.status(200).json(reg);
            } else {
                res.status(404).send({
                    message: 'La Agenda ya existe en el sistema!!',
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
            const reg = await models.Agenda.find({}).sort({fechacita : 1})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        } 
    },
    list2: async (req, res, next) => {
        try {
            const reg = await models.Agenda.findOne({})
            .populate('idusuario',{ nombre : 1, codigorol : 1 })
            .populate('idmedico',{ nombre : 1, codigorol : 1 });
            // const reg = await models.Agenda.findOne({})
            // .populate({path: 'idusuario'})
            // .populate({path: 'idmedico'});
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
            const reg = await models.Agenda.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 1});
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
            const reg = await models.Agenda.findByIdAndUpdate({ _id : req.body._id }, { codigoestado : 0});
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
            const reg = await models.Agenda.findByIdAndUpdate({ _id : req.body._id },
                {
                    idusuario : req.body.idusuario,
                    idmedico : req.body.idmedico,
                    fechacita : req.body.fechacita
                }); 
                res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrio un error interno!!',
            });
            next(error);
        }
    },
}
