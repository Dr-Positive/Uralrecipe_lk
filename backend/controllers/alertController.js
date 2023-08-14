const { Alert } = require('../models/models')
const apiError = require('../error/apiError');


class alertController {
    async create(req, res) {
        try {
            const {title, text, compl, div, dispt } = req.body
            const alert = await Alert.create({title, text, compl, div, dispt})
            return res.json(alert)

        }

        catch (e) {
            next(apiError.badRequest(e.message))
        }

    }
    // async getAll(req, res) {
    //     const alerts = await Alert.findAll()
    //     return res.json(alerts)
    // } 

    async getAll(req, res) {
    
        const { dispt, div } = req.query
        let alerts;
        if ((dispt == 1 )  && (div == 1)) { // Диспансеризация  
            alerts = await Alert.findAll({where:{div, dispt}})
        }

        if ((dispt == 12 )  && (div == 1)) { //Проф осмотры 
            alerts = await Alert.findAll({where:{div, dispt}})
        }

        if (div == 2) {   //Диспансерное наблюдение  
             alerts = await Alert.findAll({where:{div}})
        }
        return res.json(alerts)
    } 
}

module.exports = new alertController()