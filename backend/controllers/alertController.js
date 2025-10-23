import { Alert } from '../models/models.js';
import ApiError from '../error/ApiError.js';

class AlertController {
    async create(req, res, next ) {
        try {
            let {title,text,dispt,div,compl,im,ot,phone,mounth,date} = req.body
            const alert = await Alert.create({title,text,dispt,div,compl,im,ot,phone,mounth,date});
            return res.json(alert)
        }

        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getAll(req, res) {
        const alerts = await Alert.findAll()
        return res.json(alerts)

    }
    async getOne(req, res) {
        const { id } = req.params
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

export default new AlertController();