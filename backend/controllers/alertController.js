const { Alert } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class alertController {
    async create(req, res, next ) {
        try {
            let {title,text,dispt,div,compl,im,ot,phone,userId,mailingId} = req.body
            const alert = await Alert.create({title,text,dispt,div,compl,im,ot,phone,userId,mailingId});
            return res.json(alert)
        }

        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getAll(req, res) {
        const alert = await Alert.findAll()
        return res.json(alert)

    }
    async getOne(req, res) {
        const {id} = req.params
        const alert = await Alert.findOne({where: {id}})
        return res.json(alert)

    }

    // async getAll(req, res) {
    
    //     const { dispt, div } = req.query
    //     let alerts;
    //     if ((dispt == 1 )  && (div == 1)) { // Диспансеризация  
    //         alerts = await Alert.findAll({where:{div, dispt}})
    //     }

    //     if ((dispt == 12 )  && (div == 1)) { //Проф осмотры 
    //         alerts = await Alert.findAll({where:{div, dispt}})
    //     }

    //     if (div == 2) {   //Диспансерное наблюдение  
    //          alerts = await Alert.findAll({where:{div}})
    //     }
    //     return res.json(alerts)
    // } 
}

module.exports = new alertController()